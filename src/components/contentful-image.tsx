import Image from 'next/image'

const ContentfulImage = (props: any) => {
  const { src, width, quality } = props;
  return <Image src={`${src}?w=${width}&q=${quality || 75}`} alt={props.alt} {...props} />
}

export default ContentfulImage
