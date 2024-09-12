import React from 'react';
import HeroSlider,{Slide} from 'hero-slider';
import img1 from '../assets/comic.jpg';
import img2 from '../assets/Eanime.jpg';
import img3 from '../assets/variosHeroes.jpg';


const Carousel = () => {
    return (
        <HeroSlider
            slidingAnimation="left_to_right"
            orientation="horizontal"
            initialSlide={1}
            onBeforeChange={(previousSlide, nextSlide) => console.log('onBeforeChange', previousSlide, nextSlide)}
            onChange={(nextSlide) => console.log('onChange', nextSlide)}
            onAfterChange={(nextSlide) => console.log('onAfterChange', nextSlide)}
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            settings={{
                slidingDuration: 250,
                slidingDelay: 100,
                shouldAutoplay: true,
                shouldDisplayButtons: true,
                autoplayDuration: 3000,
                height: '100vh',
            }}
        >
            <Slide
                background={{
                    backgroundImage: `url('${img1}')`,
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            <Slide 
                background={{
                    backgroundImage: `url('${img2}')`,
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            <Slide 
                background={{
                    backgroundImage: `url('${img3}')`,
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

        </HeroSlider>
    )
}
  
  
export default Carousel;
