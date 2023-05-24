/* eslint-disable no-use-before-define */
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { FC, useEffect, useState } from 'react';

import { CourseWithTeacher } from '../../../../common/domain/models/course';
import { clsxm } from '../../../../common/presentation/clsxm';
import { MainButton } from '../../../../common/presentation/components/atoms/button/main-button';
import { Alert } from '../../../../common/presentation/components/molecules/alert';
import {
  MenuDropdown,
  MenuDropdownItem,
} from '../../../../common/presentation/components/molecules/dropdown/menu.dropdown';
import { InputWithLabel } from '../../../../common/presentation/components/molecules/input/input-with-label';
import { ToggleWithDescription } from '../../../../common/presentation/components/molecules/input/toggle-with-description';
import { ModalWrapper } from '../../../../common/presentation/components/molecules/modals/modal-wrapper';
import { useFetch } from '../../../../common/presentation/hooks/api-fetch';

export const StudentCourseCard: FC<{
  course: CourseWithTeacher;
  onClick?: VoidFunction;
  isForTeacher?: boolean;
  onUpdated?: VoidFunction;
}> = ({ course, onClick, isForTeacher, onUpdated }) => {
  const [currentAction, setCurrentAction] = useState<'delete' | 'update'>();

  return (
    <>
      <li
        onClick={onClick}
        className={clsxm(
          'h-full',
          onClick && [
            'cursor-pointer',
            'hover:shadow-xl',
            'transition-all',
            'hover:scale-[1.01]',
          ]
        )}
      >
        <div className='flex h-full flex-col rounded-lg bg-white p-6 shadow-lg'>
          <div className='flex items-start justify-between'>
            <h2 className='mb-4 text-2xl font-bold'>{course.name}</h2>
            <div className='flex space-x-2'>
              <span className='text-sm'>#{course.code}</span>
              {isForTeacher && (
                <MenuDropdown
                  button={
                    <div
                      className={clsxm(
                        'aspect-square rounded-full flex justify-center items-center text-white bg-purple-700',
                        'h-5 w-5'
                      )}
                    >
                      <EllipsisVerticalIcon className='h-5 w-5 text-white'></EllipsisVerticalIcon>
                    </div>
                  }
                  items={[
                    () => (
                      <MenuDropdownItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentAction('update');
                        }}
                        key={'update'}
                      >
                        Actualizar
                      </MenuDropdownItem>
                    ),
                    () => (
                      <MenuDropdownItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentAction('delete');
                        }}
                        key={'delete'}
                      >
                        Eliminar
                      </MenuDropdownItem>
                    ),
                  ]}
                ></MenuDropdown>
              )}
            </div>
          </div>
          <p className='mb-4 text-gray-600'>{course.description}</p>
          {course.teacher && (
            <div className='flex items-center'>
              <span className='mr-2 font-medium text-gray-800'>Profesor:</span>
              <span className='text-gray-600'>{course.teacher.name}</span>
            </div>
          )}
          <div className='mt-4 flex grow items-end justify-between'>
            <span className='mr-2 font-medium text-gray-800'>Estado:</span>
            <span className='text-gray-600'>
              <div
                className={clsxm(
                  'inline-block mr-2',
                  'w-3 h-3',
                  'rounded-full',
                  course.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                )}
              ></div>
              {course.status === 'ACTIVE' ? 'ACTIVO' : 'CERRADO'}
            </span>
          </div>
        </div>
      </li>
      <UpdateCourseModal
        isOpen={currentAction === 'update'}
        course={course}
        onClose={() => {
          setCurrentAction(undefined);
        }}
        onUpdate={() => {
          onUpdated?.();
          setCurrentAction(undefined);
        }}
      ></UpdateCourseModal>
      <DeleteCourseModal
        isOpen={currentAction === 'delete'}
        course={course}
        onClose={() => {
          setCurrentAction(undefined);
        }}
        onUpdate={() => {
          onUpdated?.();
          setCurrentAction(undefined);
        }}
      ></DeleteCourseModal>
    </>
  );
};

const UpdateCourseModal: FC<{
  course: CourseWithTeacher;
  isOpen: boolean;
  onClose: VoidFunction;
  onUpdate: VoidFunction;
}> = ({ course, isOpen, onClose, onUpdate }) => {
  const [data, setData] = useState({
    name: course.name,
    description: course.description,
    status: course.status,
  });

  const { refetch, result } = useFetch({
    repo: 'teacher',
    action: 'updateCourse',
  });

  useEffect(() => {
    if (result.data) {
      onUpdate();
    }
  }, [onUpdate, result]);

  return (
    <ModalWrapper open={isOpen} onClose={onClose}>
      <form
        className='space-y-4'
        onSubmit={(e) => {
          e.preventDefault();
          refetch({
            courseId: course.id,
            ...data,
          });
        }}
      >
        <h3 className='text-2xl font-bold'>Actualizar curso</h3>
        {result.error && <Alert variant='error' message={result.error}></Alert>}
        <InputWithLabel
          label='Nombre'
          value={data.name}
          onChange={(e) => {
            setData((prev) => ({ ...prev, name: e.target.value }));
          }}
        ></InputWithLabel>
        <InputWithLabel
          label='Descripción'
          value={data.description}
          onChange={(e) => {
            setData((prev) => ({ ...prev, description: e.target.value }));
          }}
        ></InputWithLabel>
        <ToggleWithDescription
          title='Estado'
          description='Si el curso está activo, los estudiantes podrán inscribirse en él.'
          enabled={data.status === 'ACTIVE'}
          setEnabled={(enabled) => {
            setData((prev) => ({
              ...prev,
              status: enabled ? 'ACTIVE' : 'INACTIVE',
            }));
          }}
        ></ToggleWithDescription>
        <div className='flex justify-end'>
          <MainButton isLoading={result.loading} type='submit'>
            Actualizar
          </MainButton>
        </div>
      </form>
    </ModalWrapper>
  );
};

const DeleteCourseModal: FC<{
  course: CourseWithTeacher;
  isOpen: boolean;
  onClose: VoidFunction;
  onUpdate: VoidFunction;
}> = ({ course, isOpen, onClose, onUpdate }) => {
  return <ModalWrapper open={isOpen} onClose={onClose}></ModalWrapper>;
};
