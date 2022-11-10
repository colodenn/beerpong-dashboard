/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import ImageUploading from 'react-images-uploading';
import useSWR from 'swr';

import Background from '@/components/charts/Background';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import { SoloStats } from '@/components/profile/SoloStats';
import { TeamStats } from '@/components/profile/TeamStats';
import Seo from '@/components/Seo';
import TablePersonal from '@/components/stats/TablePersonal';
import TablePersonalTeam from '@/components/stats/TablePersonalTeam';
import TableAgainstSolo from '@/components/stats/TableSoloStatsAgainst';
import TableWithDuo from '@/components/stats/TableTeamStatsWith';

import { fetcher } from '@/utils/fetch';
import { useUser } from '@/utils/useUser';

export default function HomePage() {
  const router = useRouter();
  const { session } = useUser();

  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  const onChange = (imageList: any) => {
    // data for submit
    setImages(imageList);
    const formData = new FormData();
    formData.append('myFile', imageList[0].file);
    fetch('/api/uploadProfileimage', {
      method: 'POST',
      body: formData,
      headers: {
        token: session?.access_token || '',
      },
    });
  };
  const { updateProfile, profile } = useUser();
  const { id } = router.query;
  const { data } = useSWR(`/api/player/${id}`, fetcher);

  const [editAvatar, setAvatarName] = useState(data?.player?.avatar_url);
  const [avatarToggle, setAvatarToggle] = useState(true);
  const [solos, setSolos] = useState('Solos');
  const [hover, setHover] = useState(false);
  React.useEffect(() => {
    setAvatarName(data?.player?.avatar_url);
  }, [data]);
  return (
    <>
      <Layout>
        {/* <Seo templateTitle='Home' /> */}
        <Seo />
        <Header />

        <main className='container mx-auto mt-48 mb-24'>
          <div className='flex justify-center'>
            <div>
              <div className='flex justify-center mx-auto rounded-full'>
                <div
                  className='grid relative grid-cols-1 grid-rows-1 ml-4 rounded-full'
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <div className='grid grid-cols-3'>
                    <div></div>
                    <div className=''>
                      {id == profile?.username ? (
                        <ImageUploading
                          multiple
                          value={images}
                          onChange={onChange}
                          maxNumber={maxNumber}
                          dataURLKey='data_url'
                        >
                          {({
                            imageList,

                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                          }) => (
                            // write your building UI
                            <div className='relative w-full h-full'>
                              {imageList.map((image, index) => (
                                <div key={index} className='image-item'>
                                  <div className='w-full h-full'>
                                    <Image
                                      src={image['data_url']}
                                      alt=''
                                      height={250}
                                      width={250}
                                      className='rounded-full'
                                    />
                                  </div>
                                </div>
                              ))}
                              <button
                                className='upload__image-wrapper'
                                onClick={() => {
                                  onImageUpload();
                                }}
                                {...dragProps}
                              >
                                {' '}
                                {imageList.length == 0 && (
                                  <div className='w-full h-full'>
                                    <Image
                                      height={250}
                                      width={250}
                                      alt=''
                                      className='absolute mx-auto rounded-full hover:cursor-pointer'
                                      src={
                                        data?.player?.avatar_url ??
                                        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/crown_1f451.png'
                                      }
                                    />
                                  </div>
                                )}
                              </button>
                            </div>
                          )}
                        </ImageUploading>
                      ) : (
                        <Image
                          height={250}
                          width={250}
                          alt=''
                          className='absolute mx-auto rounded-full'
                          src={
                            data?.player?.avatar_url ??
                            'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/crown_1f451.png'
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <h3 className='mt-6 text-center'>@{data?.player?.username}</h3>
              </div>
              <div className='mt-4'>
                <Badges id={id} />
              </div>
              <div className=''>
                <div className='flex justify-center mt-8 md:justify-end'>
                  <select
                    value={solos}
                    onChange={(e) => setSolos(e.target.value)}
                    className='select select-bordered w-24'
                  >
                    <option value='Solos'>Solos</option>
                    <option value='Duos'>Duos</option>
                  </select>
                </div>

                <div className='flex justify-center mx-auto'>
                  {solos == 'Solos' ? (
                    <SoloStats id={String(id)} />
                  ) : (
                    <TeamStats id={String(id)} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='mx-auto mt-24 w-full'>
              {solos == 'Solos' ? (
                <Background title='Solo Games' colour='#cdf9ec'>
                  <TablePersonal id={String(id)} />
                </Background>
              ) : (
                <Background title='Team Games' colour='#cdf9ec'>
                  <TablePersonalTeam id={String(id)} />
                </Background>
              )}
            </section>
          </ScrollAnimation>
          <ScrollAnimation animateIn='fade-in slide-in-bottom'>
            <section className='mx-auto mt-24 w-full'>
              {solos == 'Solos' ? (
                <Background title='Stats against others' colour='#FFEEA8'>
                  <TableAgainstSolo id={String(id)} />
                </Background>
              ) : (
                <Background title='Stats with others' colour='#FFEEA8'>
                  <TableWithDuo id={String(id)} />
                </Background>
              )}
            </section>
          </ScrollAnimation>
        </main>
        <Footer />
      </Layout>
    </>
  );
}

const Badges = (props: any) => {
  const { data: badges } = useSWR(`/api/badges/player/${props.id}`, fetcher);

  return !badges ? (
    <>Loading</>
  ) : (
    <div className='grid grid-cols-2 gap-8 px-12 w-full md:flex md:ml-12 md:space-x-12'>
      {badges?.badges.map((e: any, key: number) => (
        <div key={key} className=''>
          <div
            className='tooltip tooltip-top flex justify-center'
            data-tip={e.description}
          >
            <Image
              height={75}
              width={75}
              alt={e.description}
              src={e.url}
              className='mx-auto'
            />
          </div>
          <h3 className='mt-1 text-sm font-semibold text-center'>{e.name}</h3>
        </div>
      ))}
    </div>
  );
};
