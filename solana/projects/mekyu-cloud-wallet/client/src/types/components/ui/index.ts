import type { ReactNode } from "react"


type TypographyType = {
    content: string
    className?: string
}


type ModalType = {
    name: string | ReactNode
    children: ReactNode
    className?: string
    ref?: React.RefObject<HTMLDivElement>
}


export type {
    TypographyType,
    ModalType
}