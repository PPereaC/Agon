import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Eye, EyeOff, Chrome, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import logo from "@/assets/logo.png"

function RegisterPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    const result = await register(email, password, displayName);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-12">
          <img
            src={logo}
            alt="'Agon', del griego antiguo, significa lucha o competencia, evocando el desafío épico y la contienda en los videojuegos."
            className="h-12 w-auto object-contain mx-auto mb-12"
          />
          {/* Divider bonito y minimalista */}
          <div className="border-t border-white/60"></div>
        </div>

        {/* Tarjeta de registro */}
        <div className="bg-transparent">

          {error && (
            <div className="text-red-400 text-sm text-center mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldSet className="w-full">
              <FieldGroup>
                {/* Campo para el nombre de usuario */}
                <Field>
                  <FieldLabel htmlFor="displayName">Nombre de Usuario</FieldLabel>
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Tu nombre de usuario"
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </Field>

                {/* Campo para el email */}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Tu correo electrónico"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>

                {/* Campo para la contraseña */}
                <Field>
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Tu contraseña"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </Field>

                {/* Campo para confirmar contraseña */}
                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirmar Contraseña</FieldLabel>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Repite tu contraseña"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </Field>
              </FieldGroup>
            </FieldSet>

            {/* Botón de envío */}
            <Button
              type="submit"
              className="w-full bg-white hover:bg-gray-200 text-[#020617] font-normal py-3 rounded-none transition-colors mt-8"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Crear Cuenta'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/60"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-[#020617] text-white uppercase tracking-wider">o</span>
            </div>
          </div>

          {/* Botón de Google */}
          <Button
            className="w-full bg-transparent hover:bg-white/5 text-gray-300 border border-white/20 font-normal py-3 rounded-none transition-colors flex items-center justify-center gap-2"
            disabled={loading}
          >
            <Chrome className="w-4 h-4" />
            Continuar con Google
          </Button>

          {/* Link para iniciar sesión */}
          <p className="text-center text-gray-300 mt-8 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-white hover:text-gray-300 font-normal underline decoration-white/30 underline-offset-4 ml-1">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
