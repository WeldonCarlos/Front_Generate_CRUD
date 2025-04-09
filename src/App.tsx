import { useState } from 'react'
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField } from '@mui/material'
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

   console.log(formData)

   const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        // Primeiro, envia os dados e pega o nome do zip
        const res = await axios.post('http://127.0.0.1:5000/gerar', formData)
        const { zip_name } = res.data
  
        // Depois, faz o download
        const downloadRes = await axios.get(`http://127.0.0.1:5000/download/${zip_name}`, {
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
        alert("Erro ao gerar ou baixar o arquivo. Verifique os dados e tente novamente.")
      }
    }
  
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => setActiveStep((prev) => prev - 1)

  return (
    <Box sx={{ display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center" , width: '100%', marginTop:"4rem" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Box sx={{ width:"60%", mt: 6 }}>
        {activeStep === 0 && (
          <>
            <TextField label="Host" name="db_host" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
            <TextField label="Porta" name="db_port" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
            <TextField label="Usuário" name="db_user" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
            <TextField label="Senha" name="db_password" type="password" fullWidth sx={{ mb: 2 }} onChange={handleChange} />
            <TextField label="Banco de dados" name="db_name" fullWidth onChange={handleChange} />
          </>
        )}
        {activeStep === 1 && (
          <TextField  label="Nome da tabela" name="table_name" fullWidth onChange={handleChange} />
        )}
        {activeStep === 2 && (
          <Typography style={{display:"flex", justifyContent:"center", textWrap:"nowrap"}} variant="h6">Clique em "Finalizar" para gerar e baixar a API.</Typography>
        )}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>Voltar</Button>
        <Button onClick={handleNext} sx={{ ml: 2 }}>
          {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
        </Button>
      </Box>
    </Box>
  )
}

export default App
