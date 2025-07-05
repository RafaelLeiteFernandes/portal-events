import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, eventType, date, guests, location, description } = body

    // Validação básica
    if (!name || !email || !phone || !eventType || !date || !guests || !description) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos' },
        { status: 400 }
      )
    }

    // Template do email
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d6b36d; border-bottom: 2px solid #d6b36d; padding-bottom: 10px;">
          Novo Contato - Portal das Águas
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #3c3c3c; margin-top: 0;">Informações do Cliente:</h3>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${phone}</p>
        </div>

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #3c3c3c; margin-top: 0;">Detalhes do Evento:</h3>
          <p><strong>Tipo de Evento:</strong> ${eventType}</p>
          <p><strong>Data e Horário:</strong> ${date}</p>
          <p><strong>Número de Convidados:</strong> ${guests}</p>
          ${location ? `<p><strong>Local da Cerimônia:</strong> ${location}</p>` : ''}
        </div>

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #3c3c3c; margin-top: 0;">Descrição do Evento:</h3>
          <p style="white-space: pre-wrap;">${description}</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">
            Este email foi enviado através do formulário de contato do Portal das Águas.
          </p>
        </div>
      </div>
    `

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: 'Portal das Águas <onboarding@resend.dev>',
      to: ['rafaelleitefernandes7@gmail.com'], // Email que vai receber
      subject: `Novo contato: ${eventType} - ${name}`,
      html: emailContent,
      replyTo: email, // Para responder diretamente ao cliente
    })

    if (error) {
      console.error('Erro ao enviar email:', error)
      return NextResponse.json(
        { error: 'Erro ao enviar email. Tente novamente mais tarde.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })

  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 