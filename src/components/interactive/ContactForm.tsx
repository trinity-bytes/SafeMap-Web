import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  userType: string;
  interests: string[];
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    userType: "",
    interests: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cities = [
    "Lima",
    "Arequipa",
    "Trujillo",
    "Cusco",
    "Chiclayo",
    "Piura",
    "Iquitos",
    "Huancayo",
    "Tacna",
    "Otra",
  ];

  const userTypes = [
    "Ciudadano Individual",
    "Empresa Privada",
    "Institución Pública",
    "Organización Social",
    "Estudiante/Investigador",
  ];

  const interestOptions = [
    "Reportes de Incidentes",
    "Rutas Seguras",
    "Alertas en Tiempo Real",
    "Análisis de Datos",
    "Integración API",
    "Versión Enterprise",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, interest]
        : prev.interests.filter((i) => i !== interest),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        userType: "",
        interests: [],
      });
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          ¡Registro Exitoso!
        </h3>
        <p className="text-green-600 mb-4">
          Te hemos agregado a nuestra lista de beta testers. Te contactaremos
          pronto con acceso exclusivo a SafeMap.
        </p>
        <div className="text-sm text-green-600">
          Recibirás un email de confirmación en los próximos minutos.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nombre Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            placeholder="+51 999 999 999"
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ciudad *
          </label>
          <select
            id="city"
            name="city"
            required
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          >
            <option value="">Selecciona tu ciudad</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* User Type */}
      <div>
        <label
          htmlFor="userType"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Tipo de Usuario *
        </label>
        <select
          id="userType"
          name="userType"
          required
          value={formData.userType}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
        >
          <option value="">Selecciona el tipo</option>
          {userTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Funciones de Interés (selecciona todas las que apliquen)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {interestOptions.map((interest) => (
            <label
              key={interest}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={(e) =>
                  handleInterestChange(interest, e.target.checked)
                }
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Enviando...</span>
            </div>
          ) : (
            "Unirse a la Beta"
          )}
        </button>
      </div>

      {/* Privacy Notice */}
      <div className="text-xs text-gray-500 text-center pt-2">
        Al registrarte, aceptas nuestros{" "}
        <a href="#" className="text-primary-600 hover:underline">
          Términos de Servicio
        </a>{" "}
        y{" "}
        <a href="#" className="text-primary-600 hover:underline">
          Política de Privacidad
        </a>
        .
        <br />
        Nunca compartiremos tu información con terceros.
      </div>
    </form>
  );
};

export default ContactForm;
