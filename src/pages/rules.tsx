import Link from 'next/link';
import * as React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
export default function HomePage() {
  return (
    <>
      <Layout>
        {/* <Seo templateTitle='Home' /> */}
        <Seo />
        <Header />

        <main className='container mx-auto mt-48 mb-24'>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='container mx-auto mt-32 lg:px-28'>
              <div className='px-8 md:px-8 2xl:px-48'>
                <h3 className='text-5xl'>Official Beerpong Rules</h3>
                <div>
                  <h5 className='mt-8 text-3xl font-bold'>What do you need?</h5>
                  <div className='mt-4 md:text-xl'>
                    <ul className='ml-4 list-disc'>
                      <li>
                        <Link passHref={true} href='https://amzn.to/3FPz7GT'>
                          4 Spieler, 2 Bälle, 22 Red Cups, Bier, Beer Pong
                          Tisch/ Spielfläche
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='mt-12'>
                  <h5 className='mt-8 text-3xl font-bold'>
                    AUFBAU / MATERIALIEN
                  </h5>
                  <div className='mt-4 md:text-xl'>
                    <p>
                      Stelle zehn Becher in einer Pyramidenform auf und richte
                      sie mit der Pyramidenspitze in Richtung Tischmitte. Fülle
                      jeden Becher mit der gewünschten Menge an Bier (meistens
                      halb voll bzw. 1 Liter Bier pro Team). Ein Watercup zur
                      Reinigung der Bälle darf auf jeder Seite platziert werden.
                    </p>
                  </div>
                </div>
                <div className='mt-12'>
                  <h5 className='mt-8 text-3xl font-bold'>Basic Rules</h5>
                  <div className='mt-4 md:text-xl'>
                    <ul className='ml-4 list-disc'>
                      <li>
                        jeder Spieler eines Teams wirft je einen Ball pro Runde
                      </li>
                      <li>getroffene Becher müssen ausgetrunken werden</li>
                      <li>
                        der Ellenbogen muss beim Wurf stets hinter der
                        Tischkante bleiben
                      </li>
                      <li>
                        treffen beide Spieler, darf das Team erneut werfen
                        (“Balls Back”)
                      </li>
                      <li>
                        Aufsetzer zählen als zwei Becher, dürfen jedoch
                        abgewehrt werden
                      </li>
                      <li>die Teams werfen immer abwechselnd</li>
                      <li>
                        wenn der letzte Becher getroffen wurde, hat das Team
                        noch einen Konter
                      </li>
                      <li>
                        trifft das Team den Konter: Spiel geht weiter -
                        ansonsten Spielende
                      </li>
                      <li>
                        treffen beide Spieler den gleichen Cup werden 3 Becher
                        weggestellt (“Bombe”)
                      </li>
                      <li>
                        trifft ein Spieler mit Ansage einen alleinstehenden Cup
                        werden 2 Becher weggestellt (“Island”)
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='mt-12'>
                  <h5 className='mt-8 text-3xl font-bold'>ELLENBOGEN REGEL</h5>
                  <div className='mt-4 md:text-xl'>
                    <p>
                      Beim Werfen sollte der Ellenbogen des Werfers niemals über
                      die hintere Kante des Beer Pong Tisches ragen. Wenn diese
                      fundamentale Regel nicht eingehalten wird, gilt der
                      ausgeführte Schuss nicht und das andere Team bekommt den
                      Ball. Wenn der Ball versenkt wurde, hat der Werfer noch
                      einen Versuch
                    </p>
                  </div>
                </div>
                <div className='mt-12'>
                  <h5 className='mt-8 text-3xl font-bold'>BALLS BACK</h5>
                  <div className='mt-4 md:text-xl'>
                    <p>
                      Treffen beide Teammitglieder in der selben Runde so erhält
                      das Team die Bälle zurück und darf nochmal werfen. Die
                      Becher werden vor dem zweiten Wurf entfernt.
                    </p>
                  </div>
                </div>
                <div className='mt-12'>
                  <h5 className='mt-8 text-3xl font-bold'>ZUSAMMENSTELLEN</h5>
                  <div className='mt-4 md:text-xl'>
                    <p>
                      Ein mal pro Spiel darf man Zusammenstellen. Dies darf man
                      ab einer Anzahl von fünf verbleibenden Bechern. Nach einem
                      &ldquo;Balls Back&ldquo; gilt diese Regel allerdings
                      nicht, da die Runde immer noch am Laufen ist. Der letzte
                      Cup sollte immer ins &ldquo;Center&ldquo; (Mitte) der
                      ehemaligen Dreiecksformation verschoben werden.
                    </p>
                  </div>
                </div>
                <div className='mt-12'>
                  <h5 className='mt-8 text-3xl font-bold'>RICHTEN</h5>
                  <div className='mt-4 md:text-xl'>
                    <p>
                      Während des Spielablaufs dürfen Spieler verlangen, dass
                      das gegnerische Team dessen Becher wieder in Form bringt,
                      wenn sie nicht stehen wie sie sollten.
                    </p>
                  </div>
                </div>
                <div className='mt-12'>
                  <h5 className='mt-8 text-3xl font-bold'>FINGERN / BLASEN</h5>
                  <div className='mt-4 md:text-xl'>
                    <p>
                      Wenn ein Ball noch in einem Becher herumkreist und noch
                      nicht das Bier berührt hat, so kann dieser herausgepustet/
                      gefingert werden um den Treffer ungültig zu machen. In der
                      Regel gilt: Jungs fingern, Frauen blasen!
                    </p>
                  </div>
                </div>
                <div className='mt-12'>
                  <h5 className='mt-8 text-3xl font-bold'>DEAD CUP</h5>
                  <div className='mt-4 md:text-xl'>
                    <p>
                      Sobald ein Becher getroffen wurde, sollte er ausgetrunken
                      werden. Wenn er aber nicht geleert wird und sich in der
                      Hand eines Spielers/ am Tisch befindet, verliert dieses
                      Team automatisch wenn der Becher noch einmal vom anderen
                      Team getroffen wird. Dead Cups sind daher äußerst
                      gefährlich.
                    </p>
                  </div>
                </div>
                <div className='mt-12'>
                  <h5 className='mt-8 text-3xl font-bold'>TRICKSHOT</h5>
                  <div className='mt-4 md:text-xl'>
                    <p>
                      Wenn ein Spieler den Ball wirft und er über den Tisch auf
                      die eigene Seite zurückrollt und man ihn fängt (ohne den
                      Boden zu berühren), so ist der Werfer erneut dran. Der
                      Wurf muss aber ein Trickshot sein. Heißt: Augen zu/ mit
                      Links/ hinter dem Rücken/ etc
                    </p>
                  </div>
                </div>
                <div className='mt-12'>
                  <h5 className='mt-8 text-3xl font-bold'>BOMBE</h5>
                  <div className='mt-4 md:text-xl'>
                    <p>
                      Treffen beide Teammitglieder in den selben Becher, so gilt
                      die &ldquo;Bombe&ldquo; Regel. Es werden 3 Becher auf der
                      gegnerischen Seite entfernt und das Team erhält beide
                      Bälle zurück (Balls Back) und darf erneut werfen.
                    </p>
                  </div>
                </div>

                <p className='mt-8 md:text-2xl'></p>
              </div>
            </section>
          </ScrollAnimation>
        </main>
        <Footer />
      </Layout>
    </>
  );
}
