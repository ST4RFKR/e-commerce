'use client';

import React from 'react';
import { ArrowUp, ChevronUp } from 'lucide-react';
import { useWindowScroll } from 'react-use';
interface Props {
    showAfter?: number;
    variant?: 'simple' | 'with-progress' | 'with-text';
    position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
    className?: string;
}

export const ScrollToTopAdvanced = ({
    showAfter = 300,
    variant = 'simple',
    position = 'bottom-right',
    className,
}: Props) => {
    const { y: scrollY } = useWindowScroll();
    const [isVisible, setIsVisible] = React.useState(false);
    const [scrollProgress, setScrollProgress] = React.useState(0);

    React.useEffect(() => {
        setIsVisible(scrollY > showAfter);

        // Обчислюємо прогрес скролу для варіанту з прогресом
        if (variant === 'with-progress') {
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollY / documentHeight) * 100;
            setScrollProgress(Math.min(progress, 100));
        }
    }, [scrollY, showAfter, variant]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const getPositionClasses = () => {
        switch (position) {
            case 'bottom-left':
                return 'bottom-6 md:bottom-20 lg:bottom-6  left-6';
            case 'bottom-center':
                return 'bottom-6 md:bottom-20 lg:bottom-6  left-1/2 transform -translate-x-1/2';
            case 'bottom-right':
            default:
                return 'bottom-20 md:bottom-6 lg:bottom-6 right-6';
        }
    };

    if (!isVisible) return null;

    const renderButton = () => {
        switch (variant) {
            case 'with-progress':
                return (
                    <button
                        onClick={scrollToTop}
                        className="relative w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200 group"
                        aria-label="Прокрутити вгору">
                        {/* Progress ring */}
                        <svg
                            className="absolute inset-0 w-full h-full transform -rotate-90"
                            viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 45}`}
                                strokeDashoffset={`${2 * Math.PI * 45 * (1 - scrollProgress / 100)}`}
                                className="transition-all duration-150"
                            />
                        </svg>
                        <ArrowUp
                            size={20}
                            className="absolute inset-0 m-auto text-primary group-hover:text-primary/80"
                        />
                    </button>
                );

            case 'with-text':
                return (
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 px-4 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 group"
                        aria-label="Прокрутити вгору">
                        <ChevronUp size={18} className="text-primary group-hover:text-primary/80" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            Вгору
                        </span>
                    </button>
                );

            case 'simple':
            default:
                return (
                    <button
                        onClick={scrollToTop}
                        className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
                        aria-label="Прокрутити вгору">
                        <ArrowUp size={20} />
                    </button>
                );
        }
    };

    return (
        <div
            className={`fixed ${getPositionClasses()} z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                } ${className}`}>
            {renderButton()}
        </div>
    );
};