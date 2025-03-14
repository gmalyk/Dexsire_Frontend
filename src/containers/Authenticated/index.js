import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { CoreContext } from 'context/CoreContext'
import Header from 'components/Dashboard/Header'
import AdminHeader from 'components/Admin/Header'
import { Container, Content } from './styled'
import { ThemedComponent } from 'ui/theme'

export default function ContainerAuthenticated({ children, title, admin }) {
  const { user } = useContext(CoreContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return null
  }

  if (!user) {
    return <Redirect to="/" />
  }

  return (
    <ThemedComponent>
      <Container admin={admin}>
        <title>{title ? `${title} | ` : ''}Dexsire</title>
        {admin ? <AdminHeader title={title} /> : <Header />}
        <Content admin={admin}>
          {children}
        </Content>
      </Container>
    </ThemedComponent>
  )
}