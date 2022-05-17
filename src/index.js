const fs = require('fs');

const tex2svg = require('tex-to-svg');
const svg2png = require('svg-to-png').convert;

async function saveTeXasPNG (tex) {
    let svg = await tex2svg(tex);
    let ts = await new Date().getTime();
    await fs.writeFileSync(`${__dirname}/${ts}.svg`, svg);
    await svg2png(`${__dirname}/${ts}.svg`, __dirname, { defaultHeight: 15 });
    await fs.unlinkSync(`${__dirname}/${ts}.svg`);
    return `${__dirname}/${ts}.png`;
}

module.exports = async function (tex, _) {
    let dir = await saveTeXasPNG(tex);
    await _.channel.send({ files: [ dir ] });
    await fs.unlinkSync(dir);
}
