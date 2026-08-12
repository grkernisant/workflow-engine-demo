function Footer() {
    const startYear = 2026
    const currentYear = new Date().getFullYear()
    const yearDisplay = startYear === currentYear ? `${startYear}` : `${startYear} - ${currentYear}`
  return (
    <footer className="p-6">
      <p>&copy; {yearDisplay} Demo App.</p>
    </footer>
  )
}

export default Footer