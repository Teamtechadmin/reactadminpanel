// ** React Imports
import { ReactNode } from 'react'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

interface Props {
    children: ReactNode
}

const FontWrapper = ({ children }: Props) => {
    return <main className={`${roboto.className} fullHeight `}  >{children}</main>
}

export default FontWrapper
