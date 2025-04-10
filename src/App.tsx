import { useState } from 'react'
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField, CircularProgress, Snackbar, Alert } from '@mui/material'
import axios from 'axios'

const steps = ['Dados do Banco', 'Nome da Tabela', 'Gerar e Baixar API']

function App() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    db_host: '',
    db_port: '',
    db_name: '',
    db_user: '',
    db_password: '',
    table_name: '',
  })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateStep = () => {
    if (activeStep === 0) {
      return formData.db_host && formData.db_port && formData.db_name && formData.db_user && formData.db_password
    } else if (activeStep === 1) {
      return formData.table_name
    }
    return true
  }

  const handleNext = async () => {
    if (!validateStep()) {
      setErrorMessage('Preencha todos os campos obrigatórios antes de continuar.')
      return
    }

    if (activeStep === steps.length - 1) {
      setLoading(true)
      try {
        const res = await axios.post('https://api-generate.onrender.com/gerar', formData)
        const { zip_name } = res.data

        const downloadRes = await axios.get(`https://api-generate.onrender.com/download/${zip_name}`, {
          responseType: 'blob',
        })

        const url = window.URL.createObjectURL(new Blob([downloadRes.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', zip_name)
        document.body.appendChild(link)
        link.click()
        link.remove()
      } catch (error) {
        console.error("Erro ao gerar ou baixar o arquivo:", error)
        setErrorMessage("Erro ao gerar ou baixar o arquivo. Verifique os dados e tente novamente.")
      } finally {
        setLoading(false)
        setFormData({
          db_host: '',
            db_port: '',
            db_name: '',
            db_user: '',
            db_password: '',
            table_name: '',
        })
        setActiveStep(0)
      }
    }

    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => setActiveStep((prev) => prev - 1)
  const handleCloseSnackbar = () => setErrorMessage('')

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: '100%', marginTop: "4rem" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Box sx={{ width: "60%", mt: 6 }}>
        {activeStep === 0 && (
          <>
            <TextField required label="Host" name="db_host" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
            <TextField required label="Porta" name="db_port" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
            <TextField required label="Usuário" name="db_user" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
            <TextField required label="Senha" name="db_password" type="password" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
            <TextField required label="Banco de dados" name="db_name" fullWidth onChange={handleChange} />
          </>
        )}
        {activeStep === 1 && (
          <TextField required label="Nome da tabela" name="table_name" fullWidth onChange={handleChange} />
        )}
        {activeStep === 2 && (
          <Typography style={{ display: "flex", justifyContent: "center", textWrap: "nowrap" }} variant="h6">
            Clique em "Finalizar" para gerar e baixar a API.
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
        <Button disabled={activeStep === 0 || loading} onClick={handleBack}>Voltar</Button>
        <Button onClick={handleNext} sx={{ ml: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : (activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo')}
        </Button>
      </Box>

      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Typography variant="caption" sx={{ mt: 4, opacity: 0.5 }}>
        Desenvolvido por Weldon 🧪
      </Typography>
    </Box>
  )
}

export default App
