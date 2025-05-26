import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../components/contactForm/ContactForm';
import '@testing-library/jest-dom';

describe('ContactForm', () => {
  const mockProps = {
    referrer: '/previous-step',
    token: 'test-token',
    initialData: {},
    countryOptions: [
      { value: 'ar', label: 'Argentina' },
      { value: 'br', label: 'Brasil' }
    ],
    locale: 'es' as const,
  };

  it('renderiza los campos básicos', () => {
    render(<ContactForm {...mockProps} />);
    

    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/País/i)).toBeInTheDocument();
  });

  it('muestra errores si se intenta enviar vacío', async () => {
    render(<ContactForm {...mockProps} />);
    
    // envío sin completar campos
    fireEvent.click(screen.getByText(/Siguiente/i));

    // mensajes específicos en español
    expect(await screen.findByText(/El nombre completo es obligatorio/)).toBeInTheDocument();
    expect(await screen.findByText(/La dirección es obligatoria/)).toBeInTheDocument();
    expect(await screen.findByText(/El número debe tener al menos 7 dígitos/)).toBeInTheDocument();
    expect(await screen.findByText(/El país es obligatorio/)).toBeInTheDocument();
  });
});
