interface TransferData {
  currentTime: number;
  duration: number;
  service: string;
}

let videoExists: boolean = false;
let video: HTMLVideoElement;
let service: string = 'none';
addEventListener('visibilitychange', (): void => {
  if (document.visibilityState === 'visible') sendToBackground();
  else sendToBackground({ currentTime: 0, duration: 0, service: 'none' });
});
update();

function update(): void {
  video = document.querySelector<HTMLVideoElement>('video');
  if (document.location.hostname === 'w2g.tv')
    video = document
      .querySelector<HTMLIFrameElement>('iframe#w2g-npa-frame')
      ?.contentWindow.document.querySelector<HTMLIFrameElement>('iframe')
      ?.contentWindow.document.querySelector<HTMLVideoElement>('video');

  if (video === undefined || isNaN(video.duration)) {
    videoExists = false;
    sendToBackground();
    updateFunction();
    return;
  }
  if (videoExists) {
    updateFunction();
    return;
  }
  switch (document.location.hostname) {
    case 'www.youtube.com':
      const playback: boolean =
        document.location.pathname.includes('/watch') &&
        document.querySelector('.ytd-video-primary-info-renderer.title')
          .textContent !== '';
      if (!playback) {
        sendToBackground();
        updateFunction();
        return;
      }
      service = 'youtube';
      let adText: NodeListOf<HTMLDivElement> =
        document.querySelectorAll<HTMLDivElement>('div.ytp-ad-text');
      if (
        Array.from(adText).some((adTextElement: HTMLDivElement): boolean =>
          adTextElement.id.startsWith('simple-ad-badge')
        )
      )
        service += '-ad';
      break;
    case 'www.disneyplus.com':
      service = 'disney';
      break;
    case 'w2g.tv':
      service = 'w2g';
      break;
    case 'www.netflix.com':
      service = 'youtube'; // Netflix and YouTube use the same color for their progress bars
      break;
  }
  videoExists = true;
  sendToBackground();
  video.addEventListener('timeupdate', (): void => sendToBackground());
  updateFunction();
}

function updateFunction(): void {
  setTimeout(update, 1000);
}

function sendToBackground(overrideMessage?: TransferData): void {
  let message: TransferData = {
    currentTime: video?.currentTime ?? 0,
    duration: video?.duration ?? 0,
    service: service,
  };
  if (!videoExists) {
    message.currentTime = 0;
    message.duration = 0;
  }
  if (overrideMessage !== undefined) message = overrideMessage;
  browser.runtime.sendMessage(
    `{"properties": ${JSON.stringify(message)}, "url": "${document.location}"}`
  );
}
