import React, { useState, useEffect } from 'react';
import {Image} from 'react-native'

const SizedImage = (source) => {
    const [size, setSize] = useState()

    useEffect(() => {
        const getImageSize = () => {
            const image = new Image()
            image.src = source
            const largura = parseInt(myImage.width);
            const altura = parseInt(myImage.height);
            setSize({largura, altura})
        }
        getImageSize()
    }, [])

    console.log(size)

    return (
        <Image
            source={source}
            getSize={(t) => {console.log(t)}}
        />
    )
}

export default SizedImage;