import { lazy, Suspense } from "react";
import { SectionSkeleton } from "@/utils/lazyLoad";

export const LazyAbout = lazy(() =>
  import("./About").then((module) => ({ default: module.About }))
);

export const LazyExperience = lazy(() =>
  import("./Experience").then((module) => ({ default: module.Experience }))
);

export const LazyProjects = lazy(() =>
  import("./Projects").then((module) => ({ default: module.Projects }))
);

export const LazySkills = lazy(() =>
  import("./Skills").then((module) => ({ default: module.Skills }))
);

export const LazyContact = lazy(() =>
  import("./Contact").then((module) => ({ default: module.Contact }))
);

export function SuspendedAbout() {
  return (
    <Suspense fallback={<SectionSkeleton height="h-screen" />}>
      <LazyAbout />
    </Suspense>
  );
}

export function SuspendedExperience() {
  return (
    <Suspense fallback={<SectionSkeleton height="h-96" />}>
      <LazyExperience />
    </Suspense>
  );
}

export function SuspendedProjects() {
  return (
    <Suspense fallback={<SectionSkeleton height="h-screen" />}>
      <LazyProjects />
    </Suspense>
  );
}

export function SuspendedSkills() {
  return (
    <Suspense fallback={<SectionSkeleton height="h-96" />}>
      <LazySkills />
    </Suspense>
  );
}

export function SuspendedContact() {
  return (
    <Suspense fallback={<SectionSkeleton height="h-screen" />}>
      <LazyContact />
    </Suspense>
  );
}
