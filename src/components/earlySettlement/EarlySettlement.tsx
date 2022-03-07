import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UploadModal from './UploadModal';
import { setLoading } from '../../redux/slices/utilitySlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import axiosConfig from '../../config/axiosConfig';
import { setCaseData } from '../../redux/slices/homeSlice';
import notification from '../theme/utility/notification';

function EarlySettlement() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);

  const [agreechecked, setagreeChecked] = React.useState(false);
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);

  const toggleUploadModal = () => {
    if (!agreechecked) {
      notification('error', 'Please Agree to Continue');
      return;
    }
    setOpenUploadModal((pre) => !pre);
  };

  const handleCheck = () => {
    setagreeChecked(!agreechecked);
  };

  const downloadDocument = async () => {
    if (!agreechecked) {
      notification('error', 'Please Agree to Continue');
      return;
    }

    const URL = `/DownloadForm?email=${user}&arrayname=Download_File&filename=ES`;

    dispatch(setLoading(true));
    try {
      await axiosConfig.get(URL).then((response) => {
        // console.log("respone -- " ,response.data.data[0][0]);
        const url = window.URL.createObjectURL(
          new Blob([response.data.data[0][0]])
        );
        // console.log("url --",url);
        const link = document.createElement('a');
        // console.log(response.data[0]);
        // console.log("link",link);
        link.href = response.data.data[0][0];
        // link.href = url ;
        link.setAttribute('target', '_blank');
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
      });
      dispatch(setLoading(false));

      // notification("info", `Document Uploaded successfully`);
    } catch (error) {
      dispatch(setLoading(false));
      //@ts-ignore
      notification('error', error?.message);
    }
  };

  return (
    <>
      <p className='text-lg text-fontColor text-center mt-5'>
        Early Settlement Agreement
      </p>
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 gap-x-8 mx-8 my-4 bg-primary-lighter px-8 py-4 rounded-xl opacity-95'>
          <div className=' grid-rows-1 flex justify-center'>
            <span className='text-lg text-fontColor bg-primary-light px-4 py-2 rounded-xl'>
              Terms And Conditions
            </span>
          </div>
          <div className=' grid-rows-1 my-4'>
            <p className=' text-white'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
              recusandae odio omnis ipsa, repellendus rerum placeat adipisci
              dicta aliquid tenetur debitis, beatae aliquam qui unde odit sunt.
              Harum expedita dolores architecto nam facere labore rem sed autem
              laboriosam deserunt est, at atque fuga ipsam, minus assumenda
              molestiae nemo molestias voluptates, quas debitis excepturi sint?
              Aut quibusdam nobis similique corporis officiis natus deserunt
              enim sint sed velit delectus laboriosam pariatur eaque repellat
              nisi nostrum ipsam, consequatur distinctio consectetur vero
              blanditiis voluptatum? Accusantium nemo molestias non. Tenetur sed
              aperiam rem porro eveniet quasi enim, optio sint dolor ipsa est
              adipisci distinctio nihil eligendi doloremque voluptas. Minus
              similique ipsum consectetur aut hic recusandae, animi modi
              corporis aspernatur nisi quos, omnis debitis itaque velit pariatur
              eveniet repellat aperiam! Sequi, perferendis quidem. Provident
              aut, iste facilis minus vel reiciendis fuga praesentium nemo,
              saepe dolorem incidunt aperiam omnis blanditiis nostrum doloribus
              esse, voluptates ducimus nobis voluptatum.
            </p>
            <p className=' text-white'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
              recusandae odio omnis ipsa, repellendus rerum placeat adipisci
              dicta aliquid tenetur debitis, beatae aliquam qui unde odit sunt.
              Harum expedita dolores architecto nam facere labore rem sed autem
              laboriosam deserunt est, at atque fuga ipsam, minus assumenda
            </p>
          </div>

          <div className='grid grid-cols-2 mt-10'>
            <div className='flex justify-center'>
              <div className='flex items-center h-5'>
                <input
                  onChange={handleCheck}
                  checked={agreechecked}
                  id='agree'
                  name='agree'
                  type='checkbox'
                  className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                />
              </div>
              <div className='ml-3 text-sm'>
                <label htmlFor='agree' className='font-medium text-white'>
                  AGREE AND CONTINUE
                </label>
              </div>
            </div>
            <div className='flex justify-center'>
              <div className='flex items-center h-5'>
                <input
                  onClick={() => navigate('/')}
                  id='cancel'
                  name='cancel'
                  type='checkbox'
                  className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                />
              </div>
              <div className='ml-3 text-sm'>
                <label htmlFor='cancel' className='font-medium text-white'>
                  CANCEL
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-end mt-5'>
        <div className='grid-col-1 mx-5'>
          <button
            onClick={downloadDocument}
            type='submit'
            className='flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Download Form
          </button>
        </div>
        <div className='grid-col-1 mx-5'>
          <button
            onClick={toggleUploadModal}
            type='submit'
            className='flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Upload Form
          </button>
          <UploadModal
            closeModal={toggleUploadModal}
            isOpen={openUploadModal}
            // action={toggleUploadModal}
          />
        </div>
      </div>
    </>
  );
}

export default EarlySettlement;
