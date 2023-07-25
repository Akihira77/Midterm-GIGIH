import VideoModel from "../../models/video.model";
import { BaseService } from "./base.service";

class VideoService extends BaseService {}

export default new VideoService(VideoModel);
