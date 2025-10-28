document.addEventListener('DOMContentLoaded', () => {
    const carruseles = document.querySelectorAll('.carrusel-contenedor');

    carruseles.forEach(carruselContenedor => {
        const carruselTrack = carruselContenedor.querySelector('.carrusel-track');
        const carruselImages = Array.from(carruselTrack.children);
        const prevBtn = carruselContenedor.querySelector('.carrusel-btn.prev');
        const nextBtn = carruselContenedor.querySelector('.carrusel-btn.next');
        const carruselDots = carruselContenedor.querySelector('.carrusel-dots');

        if (!carruselTrack || carruselImages.length === 0) return;

        let currentSlide = 0;

        const getSlideWidth = () => carruselContenedor.clientWidth;

        // Crear dots
        const dots = carruselImages.map((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('carrusel-dot');
            if (i === 0) dot.classList.add('active');
            carruselDots.appendChild(dot);
            return dot;
        });

        const updateCarousel = () => {
            const slideWidth = getSlideWidth();
            carruselTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
        };

        // Eventos
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + carruselImages.length) % carruselImages.length;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % carruselImages.length;
            updateCarousel();
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateCarousel();
            });
        });

        window.addEventListener('resize', updateCarousel);
        updateCarousel();
    });
});
