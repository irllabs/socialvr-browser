import {Component, Input} from '@angular/core';

import {EventBus} from 'ui/common/event-bus';

import {SceneInteractor} from 'core/scene/sceneInteractor';

import {Audio} from 'data/scene/entities/audio';
import {Image} from 'data/scene/entities/image';
import {Text} from 'data/scene/entities/text';
import {Door} from 'data/scene/entities/door';
import {Link} from 'data/scene/entities/link';
import {RoomProperty} from 'data/scene/interfaces/roomProperty';

@Component({
  selector: 'action-menu',
  styleUrls: ['./action-menu.scss'],
  templateUrl: './action-menu.html'
})
export class ActionMenu {

  @Input() isOpen: boolean = false;

  constructor(
    private sceneInteractor: SceneInteractor,
    private eventBus: EventBus
  ) {}

  addText($event) {
    const activeRoomId: string = this.sceneInteractor.getActiveRoomId();
    const text: Text = this.sceneInteractor.addText(activeRoomId);
    this.eventBus.onSelectProperty(text.getId(), true);
  }

  addAudio($event) {
    const activeRoomId: string = this.sceneInteractor.getActiveRoomId();
    const audio: Audio = this.sceneInteractor.addAudio(activeRoomId);
    this.eventBus.onSelectProperty(audio.getId(), true);
  }

  addImage($event) {
    const activeRoomId: string = this.sceneInteractor.getActiveRoomId();
    const image: Image = this.sceneInteractor.addImage(activeRoomId);
    this.eventBus.onSelectProperty(image.getId(), true);
  }

  addDoor($event) {
    const numberOfRooms = this.sceneInteractor.getRoomIds().length;
    if (numberOfRooms < 2) {
      this.eventBus.onModalMessage('', 'There must be at least two rooms to add a door.');
      return;
    }
    const activeRoomId: string = this.sceneInteractor.getActiveRoomId();
    const door: Door = this.sceneInteractor.addDoor(activeRoomId);
    this.eventBus.onSelectProperty(door.getId(), true);
    // auto open door editor if there are multiple outgoing choices
    if (numberOfRooms > 2) {
      setTimeout(() => {
        this.eventBus.onSelectProperty(door.getId(), false, true);
      });
    }
  }

  addRoom($event) {
    this.sceneInteractor.addRoom();
    this.eventBus.onSelectRoom(null, true);
  }

  addLink($event) {
    const activeRoomId: string = this.sceneInteractor.getActiveRoomId();
    const link: Link = this.sceneInteractor.addLink(activeRoomId);
    this.eventBus.onSelectProperty(link.getId(), true);
  }

}
