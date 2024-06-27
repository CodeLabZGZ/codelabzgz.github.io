import {
  Avatar as Container,
  AvatarFallback as Fallback,
  AvatarImage as Image
} from "@/components/ui/avatar"

export function Avatar({
  image,
  value,
  className
}) {
  return (
    <Container className={className}>
      <Image
        src={image}
        alt={value}
      />
      <Fallback className="uppercase">
        {value?.slice(0,2)}
      </Fallback>
    </Container>
  )
}
