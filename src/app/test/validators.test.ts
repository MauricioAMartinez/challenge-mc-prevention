import { validateFormData } from '@/app/validators';

describe('validateFormData', () => {
  const baseData = {
    fullName: 'Juan Pérez',
    address: 'Calle Falsa 123',
    country: 'ar',
    phoneNumber: '1234567',
    captchaToken: 'token',
  };

  it('valida correctamente datos válidos', () => {
    expect(validateFormData(baseData)).toEqual({ success: true });
  });

  it('falla si falta el nombre', () => {
    const { success, message } = validateFormData({ ...baseData, fullName: '' });
    expect(success).toBe(false);
    expect(message).toMatch(/nombre completo/i);
  });

  it('falla si el país es br y el CPF es inválido', () => {
    const data = { ...baseData, country: 'br', cpf: '123', captchaToken: 'token' };
    const { success, message } = validateFormData(data);
    expect(success).toBe(false);
    expect(message).toMatch(/CPF/i);
  });
});
