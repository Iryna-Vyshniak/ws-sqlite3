// vs - view size (view width, height)

const currentWidth = () => {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
};

const currentHeight = () => {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
};

const currentVs = () => {
  const width = currentWidth();
  const height = currentHeight();

  // console.log('width: ', width);
  // console.log('height: ', height);

  if ((width * 100) / 1920 < (height * 100) / 968) return width / 1920;
  else return height / 968;
};

let vp = currentVs();
//console.log('vp: ', vp);

const setVp = () => {
  vp = currentVs();
};

const vs = (size) => {
  return Math.ceil(size * vp);
};

const vspx = (size) => {
  return Math.ceil(size * vp) + 'px';
};

export { currentHeight, currentWidth, currentVs, vs, vspx, setVp };
