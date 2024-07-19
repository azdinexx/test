export default function ShortCutLinks() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return (
      <section className='w-full bg-gray-900 text-white flex justify-center items-center relative py-20'>
        <div
          className='w-full h-full absolute top-0 left-0 opacity-40 '
          style={{
            backgroundColor: '#D9AFD9',
            backgroundImage:
              'linear-gradient(-5deg, #111827 50% , #97D9E1 70%, #D9AFD9 100% )',
          }}
        ></div>
        
        <div className='max-w-sm flex flex-col gap-6 text-3xl text-center text-white'>
        <p>
          {
            quote.french
          }
        </p>
        <p>
          {
            quote.english
          }
        </p>
        </div>
      </section>
    );
  }
  
    const quotes = [
      {
        french: "Le succès n'est pas la clé du bonheur. Le bonheur est la clé du succès.",
        english: "Success is not the key to happiness. Happiness is the key to success."
      },
      {
        french: "Travaillez dur en silence, laissez votre succès faire du bruit.",
        english: "Work hard in silence, let your success make the noise."
      },
      {
        french: "Le seul endroit où le succès vient avant le travail, c'est dans le dictionnaire.",
        english: "The only place where success comes before work is in the dictionary."
      },
      {
        french: "La persévérance est la clé de la réussite.",
        english: "Perseverance is the key to success."
      },
      {
        french: "La plus grande récompense pour un travail bien fait est l'opportunité de faire plus.",
        english: "The greatest reward for a job well done is the opportunity to do more."
      },
      {
        french: "L'avenir appartient à ceux qui croient en la beauté de leurs rêves.",
        english: "The future belongs to those who believe in the beauty of their dreams."
      },
      {
        french: "Le succès, c'est se promener d'échec en échec tout en restant motivé.",
        english: "Success is walking from failure to failure with no loss of enthusiasm."
      },
      {
        french: "Faites chaque jour quelque chose qui vous fait peur.",
        english: "Do something every day that scares you."
      },
      {
        french: "Les opportunités ne se produisent pas, vous les créez.",
        english: "Opportunities don't happen, you create them."
      },
      {
        french: "La réussite est une échelle que l'on ne peut pas gravir les mains dans les poches.",
        english: "Success is a ladder that cannot be climbed with your hands in your pockets."
      },
      {
        french: "La clé de la réussite est de se concentrer sur les objectifs, et non sur les obstacles.",
        english: "The key to success is to focus on goals, not obstacles."
      },
      {
        french: "Il n'y a pas de secrets pour le succès. C'est le résultat de la préparation, du travail acharné et de l'apprentissage des échecs.",
        english: "There are no secrets to success. It is the result of preparation, hard work, and learning from failure."
      },
      {
        french: "L'échec est simplement l'opportunité de recommencer, cette fois plus intelligemment.",
        english: "Failure is simply the opportunity to begin again, this time more intelligently."
      },
      {
        french: "La qualité n'est jamais un accident; elle est toujours le résultat d'un effort intelligent.",
        english: "Quality is never an accident; it is always the result of intelligent effort."
      },
      {
        french: "Ne vous arrêtez pas lorsque vous êtes fatigué. Arrêtez-vous lorsque vous avez terminé.",
        english: "Don't stop when you're tired. Stop when you're done."
      },
      {
        french: "Le succès n'est pas final, l'échec n'est pas fatal: c'est le courage de continuer qui compte.",
        english: "Success is not final, failure is not fatal: it is the courage to continue that counts."
      },
      {
        french: "Le seul moyen de faire du bon travail, c'est d'aimer ce que vous faites.",
        english: "The only way to do great work is to love what you do."
      },
      {
        french: "Le succès ne se mesure pas à ce que vous accomplissez, mais à l'opposition que vous avez surmontée pour y parvenir.",
        english: "Success is not measured by what you accomplish, but by the opposition you have encountered and the courage with which you have maintained the struggle against overwhelming odds."
      },
      {
        french: "Il n'y a pas de raccourci vers n'importe quel endroit où ça vaut la peine d'aller.",
        english: "There are no shortcuts to any place worth going."
      },
      {
        french: "Le travail acharné bat le talent quand le talent ne travaille pas dur.",
        english: "Hard work beats talent when talent doesn't work hard."
      },
      {
        french: "La chose la plus importante est d'essayer et d'inspirer les gens afin qu'ils puissent être grands dans tout ce qu'ils veulent faire.",
        english: "The most important thing is to try and inspire people so that they can be great in whatever they want to do."
      },
      {
        french: "L'attitude est une petite chose qui fait une grande différence.",
        english: "Attitude is a little thing that makes a big difference."
      },
      {
        french: "Vous ne pouvez pas croiser la mer simplement en restant debout et en regardant l'eau.",
        english: "You cannot cross the sea merely by standing and staring at the water."
      },
      {
        french: "La meilleure façon de prédire l'avenir est de le créer.",
        english: "The best way to predict the future is to create it."
      },
      {
        french: "Le secret de la réussite est de commencer.",
        english: "The secret of getting ahead is getting started."
      },
      {
        french: "Le bonheur ne vient pas de ce que nous obtenons, mais de ce que nous donnons.",
        english: "Happiness does not come from what we get, but from what we give."
      },
      {
        french: "L'échec n'est pas l'opposé du succès; c'est une partie du succès.",
        english: "Failure is not the opposite of success; it is part of success."
      },
      {
        french: "Rêvez en grand et osez échouer.",
        english: "Dream big and dare to fail."
      },
      {
        french: "Les grands esprits ont toujours rencontré une opposition violente des esprits médiocres.",
        english: "Great minds have always encountered violent opposition from mediocre minds."
      },
      {
        french: "Ne regardez pas l'horloge; faites ce qu'elle fait. Continuez à avancer.",
        english: "Don't watch the clock; do what it does. Keep going."
      },
      {
        french: "La vie, c'est 10 % ce qui nous arrive et 90 % comment nous y réagissons.",
        english: "Life is 10% what happens to us and 90% how we react to it."
      }
    ]
  