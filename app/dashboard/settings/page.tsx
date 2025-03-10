import { lusitana } from "@/app/ui/general/fonts";
import { SettingsContainerSkeleton } from "@/app/ui/general/skeletons";
import SettingsContainer from "@/app/ui/settings/container";
import { Suspense } from "react";

export default function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Settings
      </h1>
      <Suspense fallback={<SettingsContainerSkeleton/>}>
        <SettingsContainer />
      </Suspense>
    </main>
  );
}
