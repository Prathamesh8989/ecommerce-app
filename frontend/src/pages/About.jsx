import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'


const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]'  src={assets.about_img} alt="about image" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>PPNMART was born out of a passion for innovation and a desire to revolutionize the fashion industry. We believe fashion is more than just clothing — it’s a powerful form of self-expression. Our journey began with a vision to blend timeless elegance with modern trends, creating pieces that are both stylish and accessible. </p>
          <p>From trendsetting styles for the youth to timeless classics for mature tastes, our collections are designed to celebrate every stage of life. We pay close attention to detail, comfort, and quality, ensuring that each piece resonates with confidence and character.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at PPNMART is to empower customers with choice, convenience, and confidence. We strive to make fashion accessible without compromising on style or quality. Through seamless shopping experiences and ever-evolving collections, we aim to inspire individuality and self-expression.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assuarance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets out stringent quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been this easier.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your the best help that we can do on our part.</p>
        </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
