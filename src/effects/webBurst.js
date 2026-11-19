// Fine orbital lines surround a two-line nameplate. The same renderer powers
// the tracked opening and the camera-free preview.
export class WebBurst {
  constructor(width, height) {
    this.w = width;
    this.h = height;
    this.opening = 0;
  }

  burst() {
    this.opening = 1;
  }

  draw(ctx, time) {
    const { w, h } = this;
    const tau = Math.PI * 2;
    ctx.save();
    ctx.fillStyle = '#091517';
    ctx.fillRect(0, 0, w, h);
    ctx.translate(w / 2, h / 2);
    const colors = ['#74bcac', '#b5e7cc', '#e5aa80'];
    for (let strand = 0; strand < 30; strand++) {
      const phase = strand / 30 * tau;
      ctx.beginPath();
      for (let step = 0; step <= 144; step++) {
        const angle = step / 144 * tau;
        const wave = Math.sin(angle * 3 + phase + time * 0.53);
        const ripple = Math.cos(angle * 2 - phase - time * 0.28);
        const x = Math.cos(angle) * w * (0.43 + 0.042 * wave);
        const y = Math.sin(angle) * h * (0.43 + 0.09 * ripple);
        if (step === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = colors[Math.floor(strand / 10)];
      ctx.globalAlpha = 0.32 + this.opening * 0.25;
      ctx.lineWidth = 1.25;
      ctx.stroke();
    }
    this.opening *= 0.94;
    ctx.globalAlpha = 1;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '500 ' + h * 0.165 + 'px Georgia, serif';
    ctx.fillStyle = '#faf4e7';
    ctx.fillText('Deep Datta', 0, -h * 0.086, w * 0.72);
    ctx.font = 'italic ' + h * 0.175 + 'px Georgia, serif';
    ctx.fillStyle = '#b8ebce';
    ctx.fillText('Chaudhury', 0, h * 0.092, w * 0.72);
    ctx.restore();
  }
}
