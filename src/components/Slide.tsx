type SlideProps = {
  alt: string;
  url: string;
};

export default function Slide({ alt, url }: SlideProps): JSX.Element {
  return (
    <div className="slider__slide">
      <img src={url} alt={alt} />
    </div>
  );
}
