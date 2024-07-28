import clsx from "clsx"
import { Link } from "next-view-transitions"

function ButtonInner({ arrow = false, children }) {
  return (
    <>
      <span className="absolute inset-0 rounded-md bg-gradient-to-b from-white/80 to-white opacity-10 transition-opacity group-hover:opacity-15" />
      <span className="absolute inset-0 rounded-md opacity-7.5 shadow-[inset_0_1px_1px_white] transition-opacity group-hover:opacity-10" />
      {children} {arrow ? <span aria-hidden="true">&rarr;</span> : null}
    </>
  )
}

export function Button({ className, arrow, children, ...props }) {
  className = clsx(
    className,
    "group relative isolate flex-none rounded-md py-1.5 text-[0.8125rem]/6 font-semibold text-white",
    arrow ? "pl-2.5 pr-[calc(9/16*1rem)]" : "px-2.5"
  )

  return typeof props.href === "undefined" ? (
    <button className={className} {...props}>
      <ButtonInner arrow={arrow}>{children}</ButtonInner>
    </button>
  ) : (
    <Link className={className} {...props}>
      <ButtonInner arrow={arrow}>{children}</ButtonInner>
    </Link>
  )
}