interface TransferData {
  currentTime: number;
  playing: boolean;
  duration: number;
}

const disney: TransferData = { currentTime: 0, playing: false, duration: 0 };
update();

function update(): void {
  switch (document.location.hostname) {
    case 'www.youtube.com':
      const videoStream: HTMLVideoElement =
        document.querySelector<HTMLVideoElement>('.video-stream');
      const playback: boolean =
        document.location.pathname.includes('/watch') &&
        document.querySelector('.ytd-video-primary-info-renderer.title')
          .textContent !== '' &&
        videoStream !== undefined &&
        !isNaN(videoStream.duration);
      if (!playback) {
        sendToBackground(0, 0, 'none');
        updateFunction();
        return;
      }

      let service: string = 'youtube';
      let adText: NodeListOf<HTMLDivElement> =
        document.querySelectorAll<HTMLDivElement>('div.ytp-ad-text');
      if (
        !!Array.from(adText).find((adTextElement: HTMLDivElement): boolean =>
          adTextElement.id.startsWith('simple-ad-badge')
        )
      )
        service += '-ad';

      sendToBackground(videoStream.currentTime, videoStream.duration, service);
      break;
    case 'www.disneyplus.com':
      if (!document.querySelector('video.btm-media-client-element')) {
        disney.playing = false;
        break;
      }
      const disneyDurationDiv: HTMLDivElement =
        document.querySelector<HTMLDivElement>('div.time-display-label');
      if (disneyDurationDiv) {
        const rawText: string[] = disneyDurationDiv.innerText.split(' / ');
        disney.currentTime = timeToSeconds(rawText[0]);
        disney.duration = disney.currentTime + timeToSeconds(rawText[1]);
        disney.playing = true;
      } else if (disney.playing) disney.duration++;

      sendToBackground(disney.currentTime, disney.duration, 'disney');
      break;
    case 'w2g.tv':
      const iframe: HTMLIFrameElement =
        document.querySelector('#w2g-npa-frame');
      const w2gCurrentTimeDiv: HTMLDivElement =
        iframe.contentWindow.document.querySelector<HTMLDivElement>(
          '#time_display > span:nth-child(1)'
        );
      const w2gDurationDiv: HTMLDivElement =
        iframe.contentWindow.document.querySelector<HTMLDivElement>(
          '#time_display > span:nth-child(3)'
        );
      sendToBackground(
        timeToSeconds(w2gCurrentTimeDiv.innerText),
        timeToSeconds(w2gDurationDiv.innerText),
        'w2g'
      );
      break;
  }
  updateFunction();
}

function updateFunction(): void {
  setTimeout(update, 1000);
}

function timeToSeconds(time: string): number {
  const timeSplit: string[] = time.split(':');
  let total: number = 0;

  for (const [index, elem] of timeSplit.entries())
    total += Number(elem) * 60 ** (timeSplit.length - index);

  return total;
}

function sendToBackground(
  currentTime: number,
  duration: number,
  service: string
): void {
  browser.runtime.sendMessage(
    `{"properties": {"currentTime": ${currentTime}, "duration": ${duration}, "service": "${service}"}, "url": "${document.location}"}`
  );
}
