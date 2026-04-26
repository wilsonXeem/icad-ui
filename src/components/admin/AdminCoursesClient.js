'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AdminShell from './AdminShell';
import Card from '@/components/ui/Card';
import FormInput from '@/components/ui/FormInput';
import TextArea from '@/components/ui/TextArea';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import Loader from '@/components/ui/Loader';
import EmptyState from '@/components/ui/EmptyState';
import { getApiErrorMessage } from '@/lib/api';
import {
  createCourse,
  createCourseModule,
  deleteCourse,
  deleteCourseModule,
  getCourseModules,
  getCourses,
  updateCourse,
  updateCourseModule,
} from '@/lib/courses';

const courseSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z
    .string()
    .min(3, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers, and hyphens only'),
  description: z.string().min(20, 'Provide a fuller course description'),
  category: z.string().optional(),
  level: z.string().optional(),
  thumbnail: z.string().optional(),
  isPublished: z.boolean().default(false),
});

const moduleSchema = z.object({
  title: z.string().min(2, 'Module title is required'),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  position: z.coerce.number().min(0, 'Position must be zero or greater'),
  isPreview: z.boolean().default(false),
});

const emptyCourseValues = {
  title: '',
  slug: '',
  description: '',
  category: '',
  level: '',
  thumbnail: '',
  isPublished: false,
};

const emptyModuleValues = {
  title: '',
  description: '',
  videoUrl: '',
  position: 0,
  isPreview: false,
};

export default function AdminCoursesClient() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModulesLoading, setIsModulesLoading] = useState(false);
  const [courseMessage, setCourseMessage] = useState({ type: '', text: '' });
  const [moduleMessage, setModuleMessage] = useState({ type: '', text: '' });

  const {
    register: registerCourse,
    handleSubmit: handleCourseSubmit,
    reset: resetCourseForm,
    formState: { errors: courseErrors, isSubmitting: isSubmittingCourse },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: emptyCourseValues,
  });

  const {
    register: registerModule,
    handleSubmit: handleModuleSubmit,
    reset: resetModuleForm,
    formState: { errors: moduleErrors, isSubmitting: isSubmittingModule },
  } = useForm({
    resolver: zodResolver(moduleSchema),
    defaultValues: emptyModuleValues,
  });

  const loadCourses = async (courseIdToSelect) => {
    try {
      const response = await getCourses({ limit: 100 });
      const nextCourses = response.data || [];
      setCourses(nextCourses);

      if (!nextCourses.length) {
        setSelectedCourse(null);
        setModules([]);
        resetCourseForm(emptyCourseValues);
        return;
      }

      const nextSelectedCourse =
        nextCourses.find((course) => course._id === courseIdToSelect) ||
        nextCourses.find((course) => course._id === selectedCourse?._id) ||
        nextCourses[0];

      setSelectedCourse(nextSelectedCourse);
      resetCourseForm({
        title: nextSelectedCourse.title || '',
        slug: nextSelectedCourse.slug || '',
        description: nextSelectedCourse.description || '',
        category: nextSelectedCourse.category || '',
        level: nextSelectedCourse.level || '',
        thumbnail: nextSelectedCourse.thumbnail || '',
        isPublished: Boolean(nextSelectedCourse.isPublished),
      });
    } catch (error) {
      setCourseMessage({ type: 'error', text: getApiErrorMessage(error, 'Unable to load courses.') });
    } finally {
      setIsLoading(false);
    }
  };

  const loadModules = async (courseId) => {
    if (!courseId) {
      setModules([]);
      return;
    }

    setIsModulesLoading(true);

    try {
      const response = await getCourseModules(courseId);
      setModules(response.data || []);
    } catch (error) {
      setModuleMessage({ type: 'error', text: getApiErrorMessage(error, 'Unable to load modules.') });
      setModules([]);
    } finally {
      setIsModulesLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse?._id) {
      loadModules(selectedCourse._id);
    }
  }, [selectedCourse?._id]);

  const beginNewCourse = () => {
    setSelectedCourse(null);
    setSelectedModule(null);
    setModules([]);
    setCourseMessage({ type: '', text: '' });
    resetCourseForm(emptyCourseValues);
    resetModuleForm(emptyModuleValues);
  };

  const beginEditCourse = (course) => {
    setSelectedCourse(course);
    setSelectedModule(null);
    setCourseMessage({ type: '', text: '' });
    resetCourseForm({
      title: course.title || '',
      slug: course.slug || '',
      description: course.description || '',
      category: course.category || '',
      level: course.level || '',
      thumbnail: course.thumbnail || '',
      isPublished: Boolean(course.isPublished),
    });
  };

  const onSubmitCourse = async (values) => {
    setCourseMessage({ type: '', text: '' });

    try {
      const payload = {
        ...values,
        category: values.category || undefined,
        level: values.level || undefined,
        thumbnail: values.thumbnail || undefined,
      };

      if (selectedCourse?._id) {
        const response = await updateCourse(selectedCourse._id, payload);
        setCourseMessage({ type: 'success', text: response.message || 'Course updated successfully.' });
        await loadCourses(selectedCourse._id);
      } else {
        const response = await createCourse(payload);
        const createdCourse = response.data;
        setCourseMessage({ type: 'success', text: response.message || 'Course created successfully.' });
        await loadCourses(createdCourse?._id);
      }
    } catch (error) {
      setCourseMessage({ type: 'error', text: getApiErrorMessage(error, 'Unable to save course.') });
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const confirmed = window.confirm('Delete this course and its modules?');

    if (!confirmed) {
      return;
    }

    try {
      const response = await deleteCourse(courseId);
      setCourseMessage({ type: 'success', text: response.message || 'Course deleted successfully.' });
      beginNewCourse();
      await loadCourses();
    } catch (error) {
      setCourseMessage({ type: 'error', text: getApiErrorMessage(error, 'Unable to delete course.') });
    }
  };

  const beginNewModule = () => {
    setSelectedModule(null);
    setModuleMessage({ type: '', text: '' });
    resetModuleForm(emptyModuleValues);
  };

  const beginEditModule = (module) => {
    setSelectedModule(module);
    setModuleMessage({ type: '', text: '' });
    resetModuleForm({
      title: module.title || '',
      description: module.description || '',
      videoUrl: module.videoUrl || '',
      position: Number(module.position || 0),
      isPreview: Boolean(module.isPreview),
    });
  };

  const onSubmitModule = async (values) => {
    if (!selectedCourse?._id) {
      setModuleMessage({ type: 'error', text: 'Select or create a course before managing modules.' });
      return;
    }

    setModuleMessage({ type: '', text: '' });

    try {
      const payload = {
        ...values,
        description: values.description || undefined,
        videoUrl: values.videoUrl || undefined,
      };

      if (selectedModule?._id) {
        const response = await updateCourseModule(selectedModule._id, payload);
        setModuleMessage({ type: 'success', text: response.message || 'Module updated successfully.' });
      } else {
        const response = await createCourseModule(selectedCourse._id, payload);
        setModuleMessage({ type: 'success', text: response.message || 'Module created successfully.' });
      }

      setSelectedModule(null);
      resetModuleForm(emptyModuleValues);
      await loadModules(selectedCourse._id);
    } catch (error) {
      setModuleMessage({ type: 'error', text: getApiErrorMessage(error, 'Unable to save module.') });
    }
  };

  const handleDeleteModule = async (moduleId) => {
    const confirmed = window.confirm('Delete this module?');

    if (!confirmed) {
      return;
    }

    try {
      const response = await deleteCourseModule(moduleId);
      setModuleMessage({ type: 'success', text: response.message || 'Module deleted successfully.' });
      if (selectedModule?._id === moduleId) {
        setSelectedModule(null);
        resetModuleForm(emptyModuleValues);
      }
      await loadModules(selectedCourse?._id);
    } catch (error) {
      setModuleMessage({ type: 'error', text: getApiErrorMessage(error, 'Unable to delete module.') });
    }
  };

  return (
    <AdminShell
      title="Course and module management."
      description="Create, publish, update, and structure academy content directly from the site. Instructors and admins can both manage this area."
      allowedRoles={['admin', 'instructor']}
    >
      {isLoading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader label="Loading course workspace..." />
        </div>
      ) : (
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-6">
            <Card>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Courses</p>
                  <h2 className="mt-3 font-heading text-2xl font-semibold text-white">Academy catalog</h2>
                </div>
                <SecondaryButton onClick={beginNewCourse}>New course</SecondaryButton>
              </div>
              <div className="mt-6 grid gap-4">
                {courses.length ? (
                  courses.map((course) => (
                    <div key={course._id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{course.slug}</p>
                          <h3 className="mt-2 font-heading text-xl font-semibold text-white">{course.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-slate-300">{course.description}</p>
                          <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.22em] text-slate-400">
                            <span>{course.category || 'No category'}</span>
                            <span>{course.level || 'No level'}</span>
                            <span className={course.isPublished ? 'text-accent' : 'text-accentWarm'}>
                              {course.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <SecondaryButton onClick={() => beginEditCourse(course)}>Edit</SecondaryButton>
                          <SecondaryButton onClick={() => handleDeleteCourse(course._id)} className="border-rose-400/30 text-rose-200">
                            Delete
                          </SecondaryButton>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="No courses yet"
                    description="Create the first academy course to begin populating the frontend course catalog."
                  />
                )}
              </div>
            </Card>
          </div>

          <div className="grid gap-6">
            <Card>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                {selectedCourse ? 'Edit Course' : 'Create Course'}
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-white">
                {selectedCourse ? selectedCourse.title : 'New academy course'}
              </h2>
              <form onSubmit={handleCourseSubmit(onSubmitCourse)} className="mt-6 grid gap-5">
                <FormInput label="Title" name="title" register={registerCourse} error={courseErrors.title} />
                <FormInput label="Slug" name="slug" register={registerCourse} error={courseErrors.slug} />
                <TextArea
                  label="Description"
                  name="description"
                  register={registerCourse}
                  error={courseErrors.description}
                  rows={5}
                />
                <div className="grid gap-5 md:grid-cols-2">
                  <FormInput label="Category" name="category" register={registerCourse} error={courseErrors.category} />
                  <FormInput label="Level" name="level" register={registerCourse} error={courseErrors.level} />
                </div>
                <FormInput
                  label="Thumbnail URL"
                  name="thumbnail"
                  register={registerCourse}
                  error={courseErrors.thumbnail}
                />
                <label className="flex items-center gap-3 text-sm text-slate-200">
                  <input type="checkbox" {...registerCourse('isPublished')} className="h-4 w-4 rounded border-white/20 bg-transparent" />
                  Publish this course
                </label>
                {courseMessage.text ? (
                  <p className={`text-sm ${courseMessage.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {courseMessage.text}
                  </p>
                ) : null}
                <div className="flex flex-wrap gap-3">
                  <PrimaryButton type="submit" disabled={isSubmittingCourse}>
                    {isSubmittingCourse
                      ? 'Saving...'
                      : selectedCourse
                        ? 'Update course'
                        : 'Create course'}
                  </PrimaryButton>
                  <SecondaryButton onClick={beginNewCourse}>Reset</SecondaryButton>
                </div>
              </form>
            </Card>

            <Card>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Modules</p>
                  <h2 className="mt-3 font-heading text-2xl font-semibold text-white">
                    {selectedCourse ? `Modules for ${selectedCourse.title}` : 'Select a course'}
                  </h2>
                </div>
                <SecondaryButton onClick={beginNewModule}>New module</SecondaryButton>
              </div>

              <form onSubmit={handleModuleSubmit(onSubmitModule)} className="mt-6 grid gap-5">
                <FormInput label="Module title" name="title" register={registerModule} error={moduleErrors.title} />
                <TextArea
                  label="Description"
                  name="description"
                  register={registerModule}
                  error={moduleErrors.description}
                  rows={4}
                />
                <div className="grid gap-5 md:grid-cols-2">
                  <FormInput label="Video URL" name="videoUrl" register={registerModule} error={moduleErrors.videoUrl} />
                  <FormInput
                    label="Position"
                    name="position"
                    type="number"
                    register={registerModule}
                    error={moduleErrors.position}
                  />
                </div>
                <label className="flex items-center gap-3 text-sm text-slate-200">
                  <input type="checkbox" {...registerModule('isPreview')} className="h-4 w-4 rounded border-white/20 bg-transparent" />
                  Available as preview
                </label>
                {moduleMessage.text ? (
                  <p className={`text-sm ${moduleMessage.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {moduleMessage.text}
                  </p>
                ) : null}
                <div className="flex flex-wrap gap-3">
                  <PrimaryButton type="submit" disabled={isSubmittingModule || !selectedCourse}>
                    {isSubmittingModule
                      ? 'Saving...'
                      : selectedModule
                        ? 'Update module'
                        : 'Create module'}
                  </PrimaryButton>
                  <SecondaryButton onClick={beginNewModule}>Reset</SecondaryButton>
                </div>
              </form>

              <div className="mt-8">
                {isModulesLoading ? (
                  <Loader label="Loading modules..." />
                ) : modules.length ? (
                  <div className="grid gap-4">
                    {modules.map((module) => (
                      <div key={module._id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                              Position {module.position ?? 0} {module.isPreview ? '• Preview' : ''}
                            </p>
                            <h3 className="mt-2 font-heading text-lg font-semibold text-white">{module.title}</h3>
                            {module.description ? (
                              <p className="mt-3 text-sm leading-7 text-slate-300">{module.description}</p>
                            ) : null}
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <SecondaryButton onClick={() => beginEditModule(module)}>Edit</SecondaryButton>
                            <SecondaryButton onClick={() => handleDeleteModule(module._id)} className="border-rose-400/30 text-rose-200">
                              Delete
                            </SecondaryButton>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No modules yet"
                    description="Once modules are added to the selected course, they will appear here for quick editing."
                  />
                )}
              </div>
            </Card>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
