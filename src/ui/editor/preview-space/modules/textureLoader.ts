import {Injectable} from '@angular/core';

import {SceneInteractor} from 'core/scene/sceneInteractor';
import {AssetInteractor, AssetModel} from 'core/asset/assetInteractor';
import {ICON_PATH, IMAGE_PATH} from 'ui/common/constants';

const iconPaths: AssetModel[] = [
  new AssetModel('hotspot-default', 'hotspot-default', `${ICON_PATH}icon-hotspot-default.png`),
  new AssetModel('hotspot-hover', 'hotspot-hover', `${ICON_PATH}icon-hotspot-hover.png`),

  new AssetModel('back', 'back', `${ICON_PATH}back_filled.png`),
  new AssetModel('home', 'home', `${ICON_PATH}home_filled.png`),
  new AssetModel('colorBall', 'colorBall', `${IMAGE_PATH}color_ball.jpg`),
  new AssetModel('imageMask', 'imageMask', `${IMAGE_PATH}image-mask_1920.jpg`)
];

@Injectable()
export class TextureLoader {

  constructor(
    private sceneInteractor: SceneInteractor,
    private assetInteractor: AssetInteractor
  ) {}

  load(): Promise<any> {
    const backgroundImages = this.sceneInteractor.getRoomIds()
      .map(roomId => this.sceneInteractor.getRoomById(roomId))
      .filter(room => room.hasBackgroundImage())
      .map(room => {
        let imagePath = room.getBinaryFileData();
        if (imagePath.changingThisBreaksApplicationSecurity) {
          imagePath = imagePath.changingThisBreaksApplicationSecurity;
        }
        return new AssetModel(room.getId(), room.getFileName(), imagePath);
      });

    //TODO: should this be in the interactor? There is an identical pattern with audio
    const hotspotImages = this.sceneInteractor.getRoomIds()
      .map(roomId => this.sceneInteractor.getRoomById(roomId))
      .reduce((accumulator, room) => {
        const imagePropertyList = Array.from(room.getImages())
          .filter(image => image.getBinaryFileData())
          .map(image => {
            const imageDataUri = image.getBinaryFileData().changingThisBreaksApplicationSecurity ?
              image.getBinaryFileData().changingThisBreaksApplicationSecurity : image.getBinaryFileData();
            return new AssetModel(image.getId(), image.getFileName(), imageDataUri);
          });

        const universalImagePropertyList = Array.from(room.getUniversal())
          .filter(universal => universal.imageContent.hasAsset())
          .map((universal) => {
            let imageDataUri;

            if (universal.imageContent.getBinaryFileData().changingThisBreaksApplicationSecurity) {
              imageDataUri = universal.imageContent.getBinaryFileData().changingThisBreaksApplicationSecurity;
            } else {
              imageDataUri = universal.imageContent.getBinaryFileData();
            }

            return new AssetModel(universal.getId(), universal.imageContent.getFileName(), imageDataUri);
          });

        accumulator = accumulator.concat(imagePropertyList);
        accumulator = accumulator.concat(universalImagePropertyList);

        return accumulator;
      }, []);

    const imageList = backgroundImages
      .concat(hotspotImages)
      .concat(iconPaths);

    return this.assetInteractor.loadTextures(imageList);
  }
}
