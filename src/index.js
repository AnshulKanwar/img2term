import chalk from "chalk";
import sharp from "sharp";

const log = (msg) => {
  process.stdout.write(msg);
};

const getPixels = async (filePath) => {
  const rawData = await sharp(filePath)
    .resize({ width: 50})
    .raw()
    .toBuffer({ resolveWithObject: true });
  return rawData;
};

const reshape = (iter, width, height) => {
  let pixels = [];

  for (let x = 0; x < width; x++) {
    let row = [];
    for (let y = 0; y < height; y++) {
      let {value: r} = iter.next();
      let {value: g} = iter.next();
      let {value: b} = iter.next();
      row.push([r, g, b])
    }
    pixels.push(row)
  }

  return pixels
};

const { data, info } = await getPixels("image.jpg");
const pixels = reshape(data.values(), info.width, info.height);

pixels.forEach(row => {
  row.forEach(pixel => {
    log(chalk.rgb(pixel[0], pixel[1], pixel[2]).inverse(' '))
  })
  log('\n')
})