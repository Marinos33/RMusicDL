import { DownloadingProfile } from '../Types';

export const mapProfile = (profile: any): DownloadingProfile => {
  return {
    id: profile.id,
    outputExtension: profile.output_extension,
    outputPath: profile.output_path,
  };
};
