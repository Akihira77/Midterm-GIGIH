import VideoThumbnailModel from "../../models/videoThumbnail.model";
import { BaseService } from "./base.service";

class VideoThumbnailService extends BaseService {
  AddThumbnail = async (videoId: string, urlImage: string) => {
    return await this._model.updateOne(
      { videoId: videoId },
      { $push: { urlImage: urlImage } },
      { returnDocument: "after" }
    );
  };

  GetByVideoId = async (videoId: string) => {
    return await this._model.findOne({ videoId: videoId });
  };
}

export default new VideoThumbnailService(VideoThumbnailModel);
