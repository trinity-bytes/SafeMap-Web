// Scroll-triggered animations using Intersection Observer
document.addEventListener("DOMContentLoaded", function () {
  // Crear el observer para detectar cuando los elementos entran al viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Agregar la clase visible para hacer aparecer el elemento
          entry.target.classList.add("visible");

          // Buscar elementos hijos con data-delay y aplicar delays escalonados
          const childElements = entry.target.querySelectorAll("[data-delay]");
          childElements.forEach((child, index) => {
            const delay = child.getAttribute("data-delay");
            if (delay) {
              setTimeout(() => {
                child.classList.add("visible");
              }, parseInt(delay));
            }
          });

          // Una vez animado, dejar de observar este elemento (para performance)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Activar cuando el 10% del elemento sea visible
      rootMargin: "0px 0px -50px 0px", // Activar un poco antes de que sea completamente visible
    }
  );
  // Observar todos los elementos marcados para animación por scroll
  const elementsToAnimate = document.querySelectorAll(
    ".animate-on-scroll-trigger"
  );

  elementsToAnimate.forEach((element) => {
    // Asegurar que tengan la clase animate-on-scroll para empezar ocultos
    element.classList.add("animate-on-scroll");

    // Si el elemento tiene la clase blurred-fade, mantenerla
    if (element.classList.contains("blurred-fade")) {
      // Ya tiene blurred-fade, no hay que hacer nada extra
    }

    // También preparar elementos hijos con data-delay
    const childElements = element.querySelectorAll("[data-delay]");
    childElements.forEach((child) => {
      child.classList.add("animate-on-scroll");
      if (child.classList.contains("blurred-fade")) {
        // Mantener blurred-fade en hijos también
      }
    });
    // Remover cualquier animación inmediata SOLO de elementos scroll-trigger
    if (element.classList.contains("animate-on-scroll-trigger")) {
      element.classList.remove("animate-blurred-fade-in");
    }

    // Comenzar a observar el elemento
    observer.observe(element);
  });
});
