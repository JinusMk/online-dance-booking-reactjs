export const responsiveCarousel = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1279 },
      items: 3,
      partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 1279, min: 960 },
      items: 2,
      partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 959, min: 599 },
      items: 2,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: { max: 599, min: 0 },
      items: 1,
      partialVisibilityGutter: 40
    }
};

export const regExpression = {
  email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/,
  digits: /^(0|[1-9][0-9]{0,9})$/,
  name: /^[a-zA-ZÀ-ÖØ-öø-ÿ -]{1,100}$/,
}

export const imageBasePath = 'https://letzdance-fe.s3.us-east-2.amazonaws.com/'

export const reviewsData = [
  {
    id: '',
    name: 'Neeti Singh',
    rating: '4',
    media: '',
    text: 'I have been attending Zumba for couple of years, I came across this site for online Zumba. The instructor was good, the session was peppy and a good workout.',
    class_date: '01 July 2020',
    category: 'zumba'
  },
  {
    id: '',
    name: 'Amrita',
    rating: '5',
    media: '',
    text: 'The Zumba session was fab… awesome energy and super workout. The instructor guided us with the steps and checked if we are doing it right.. thank u..',
    class_date: '01 August 2020',
    category: 'zumba'
  },
  {
    id: '',
    name: 'Shruti Nair',
    rating: '4',
    media: '',
    text: 'This is the first time I am attending Zumba, when the session started I was feeling it’s high intensity but eventually when I took few breaks for a min and continued i had so much fun and its helping me in my weight loss. can’t wait for my next session.',
    class_date: '13 August 2020',
    category: 'zumba'
  },
  {
    id: '',
    name: 'Vivek Kumar',
    rating: '5',
    media: '',
    text: 'The instructor gave clear step by step instruction and made it super easy to learn. I thought I had a left feet but the first class gave me an enormous confidence.',
    class_date: '02 August 2020',
    category: 'bollywood'
  },
  {
    id: '',
    name: 'Vaishali',
    rating: '5',
    media: '',
    text: 'Loved the way how every part of choreography was easily broken down to easy simple steps. I am super happy that I am able to dance to my favourite song now! Thank you!',
    class_date: '03 October 2020',
    category: 'bollywood'
  },
  {
    id: '',
    name: 'Shilpa Raheja',
    rating: '5',
    media: '',
    text: 'I had a very good online Bollywood class with Manas, can’t wait for my next..',
    class_date: '17 July 2020',
    category: 'bollywood'
  },
  {
    id: '',
    name: 'Priyanka Bhavani',
    rating: '4',
    media: '',
    text: 'Loved the hiphop class, awesome instructor. I would like to join the regular sessions and learn hiphop. thank you.',
    class_date: '23 September 2020',
    category: 'hiphop'
  },
  {
    id: '',
    name: 'Nilesh',
    rating: '5',
    media: '',
    text: 'I booked the class for my son who has a passion to dance but gets bored very quickly, I found this class more convenient as its online from home. my son seems to be interested as they introduce new steps and style in every class.',
    class_date: '04 October 2020',
    category: 'hiphop'
  },
  {
    id: '',
    name: 'Akrit',
    rating: '5',
    media: '',
    text: 'This is the first time I am trying an online Hiphop session, I never thought it would be so much fun! The instructor was so patient and he taught every step until everyone got it right. Its rare to find someone so patient and motivating. Thanks for a wonderful session…',
    class_date: '15 September 2020',
    category: 'hiphop'
  },
  {
    id: '',
    name: 'Gurmeet Singh',
    rating: '5',
    media: '',
    text: 'Great option to keep the kids active and learn dancing from home. Its very convenient no worry of being late or traffic! She is enjoying every class.. Looking forward to more classes.',
    class_date: '17 September 2020',
    category: 'bollywood-kids'
  },
  {
    id: '',
    name: 'Niveditha',
    rating: '4',
    media: '',
    text: 'Very nice concept, my daughter enjoyed the class… very convenient. The instructor is very good and polite. Thank you.',
    class_date: '01 October 2020',
    category: 'bollywood-kids'
  },
  {
    id: '',
    name: 'Swetha',
    rating: '5',
    media: '',
    text: 'I never though I can make my kid be attentive for an online class as he is always running around but you guys proved me wrong. He stayed the whole time during the online dance session and he thoroughly enjoyed. Thank you.',
    class_date: '06 October 2020',
    category: 'bollywood-kids'
  },
]

export const instructorsData = [
  {
    id: "",
    name: 'Angel Bensy',
    qualification: 'ZIN Certified', 
    experience: '5', 
    rating: '4.5', 
    rating_count: 23, 
    no_of_classes: 51, 
    category: 'zumba',
    img: `${imageBasePath}Angel_zumba.jpg`	
  },
  {
    id: "",
    name: 'Manas',
    qualification: 'Guinness Record Holder', 
    experience: '10', 
    rating: '5', 
    rating_count: 57, 
    no_of_classes: 79, 
    category: 'bollywood',
    img: `${imageBasePath}Manas_bollywood.jpg`
  },
  {
    id: "",
    name: 'Arun',
    qualification: 'Expert Dance Master', 
    experience: '6', 
    rating: '4.5', 
    rating_count: 27, 
    no_of_classes: 31, 
    category: 'bollywood-kids',
    img: `${imageBasePath}Arun_bollywood-kids.jpeg`
  },
  {
    id: "",
    name: 'Deena',
    qualification: 'Award winning Choreographer ', 
    experience: '9', 
    rating: '4.5', 
    rating_count: 34, 
    no_of_classes: 43, 
    category: 'hiphop',
    img: `${imageBasePath}Deena_hiphop.jpg`
  },
]

export const lastWeekRecapVideos = [
  {
    id: '',
    img: `${imageBasePath}zumba_logo_2.svg`,
    primaryImage: `${imageBasePath}zumba_logo_1.svg`,
    category: 'zumba',
    instructor: 'Angel Bensy',
    participants: '22',
    date: '14 Oct 2020',
    media: `${imageBasePath}zumba_recap_1.mp4`
  },
  {
    id: '',
    img: `${imageBasePath}bollywood_logo_2.svg`,
    primaryImage: `${imageBasePath}bollywood_logo_1.svg`,
    category: 'bollywood',
    instructor: 'Manas',
    participants: '21',
    date: '16 Oct 2020',
    media: `${imageBasePath}bollywood_recap_1.mp4`
  },
  {
    id: '',
    img: `${imageBasePath}hiphop_logo_2.svg`,
    primaryImage: `${imageBasePath}hiphop_logo_1.svg`,
    category: 'hiphop',
    instructor: 'Deena',
    participants: '12',
    date: '15 Oct 2020',
    media: `${imageBasePath}hiphop_recap_1.mp4`
  },
  {
    id: '',
    img: `${imageBasePath}bollywood-kids_logo_2.svg`,
    primaryImage: `${imageBasePath}bollywood-kids_logo_1.svg`,
    category: 'bollywood-kids',
    instructor: 'Manas',
    participants: '12',
    date: '12 Oct 2020',
    media: `${imageBasePath}bollywood-kids_recap_1.mp4`
  },
  {
    id: '',
    img: `${imageBasePath}zumba_logo_2.svg`,
    primaryImage: `${imageBasePath}zumba_logo_1.svg`,
    category: 'zumba',
    instructor: 'Angel Bensy',
    participants: '27',
    date: '17 Oct 2020',
    media: `${imageBasePath}zumba_recap_2.mp4`
  },
  {
    id: '',
    img: `${imageBasePath}hiphop_logo_2.svg`,
    primaryImage: `${imageBasePath}hiphop_logo_1.svg`,
    category: 'hiphop',
    instructor: 'Deena',
    participants: '16',
    date: '16 Oct 2020',
    media: `${imageBasePath}hiphop_recap_2.mp4`
  },
  {
    id: '',
    img: `${imageBasePath}bollywood_logo_2.svg`,
    primaryImage: `${imageBasePath}bollywood_logo_1.svg`,
    category: 'bollywood',
    instructor: 'Manas',
    participants: '23',
    date: '18 Oct 2020',
    media: `${imageBasePath}bollywood_recap_2.mp4`
  },
  {
    id: '',
    img: `${imageBasePath}bollywood-kids_logo_2.svg`,
    primaryImage: `${imageBasePath}bollywood-kids_logo_1.svg`,
    category: 'bollywood-kids',
    instructor: 'Manas',
    participants: '19',
    date: '14 Oct 2020',
    media: `${imageBasePath}bollywood-kids_recap_2.mp4`
  }
]