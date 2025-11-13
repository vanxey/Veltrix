import { render, screen } from '@testing-library/react'
import Header from '@/components/header'

jest.mock('next/link', () => {
  const MockLink = ({ children, href }) => {
    return <a href={href}>{children}</a>
  }
  MockLink.displayName = 'MockLink'
  return MockLink
})

describe('Header', () => {
  it('renders all navigation links', () => {
    render(<Header />)

    expect(screen.getByText('Veltrix')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Journaling')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('News')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Get started')).toBeInTheDocument()
  })
})