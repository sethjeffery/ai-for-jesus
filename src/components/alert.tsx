import Link from 'next/link'
import Container from './container'
import cn from 'classnames'

interface AlertProps {
  preview: boolean
}

export default function Alert({ preview }: AlertProps) {
  if (!preview) return null;

  return (
    <div
      className={cn('border-b', {
        'bg-accent-7 border-accent-7 text-white': preview,
        'bg-accent-1 border-accent-2': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          <>
            This page is a preview.{' '}
            <Link
              href="/api/exit-preview"
              className="underline hover:text-cyan duration-200 transition-colors"
            >
              Click here
            </Link>{' '}
            to exit preview mode.
          </>
        </div>
      </Container>
    </div>
  )
}
