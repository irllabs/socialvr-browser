import {
  Component,
  Input,
  ViewChild,
  HostListener
} from '@angular/core';
import {Router} from '@angular/router';

import {EventBus} from 'ui/common/event-bus';
import {UserInteractor} from 'core/user/userInteractor';
import {GroupInteractor} from 'core/group/groupInteractor';
import {ProjectInteractor} from 'core/project/projectInteractor';
import {SceneInteractor} from 'core/scene/sceneInteractor';
import {MetaDataInteractor} from 'core/scene/projectMetaDataInteractor';
import {ERROR_OPENING_PROJECT, FORMAT_ERROR, SERVER_ERROR} from 'ui/common/constants';

@Component({
  selector: 'user-groups',
  styleUrls: ['./user-groups.scss'],
  templateUrl: './user-groups.html'
})
export class UserGroups {

  private projects = {};

  constructor(
    private userInteractor: UserInteractor,
    private groupInteractor: GroupInteractor,
    private projectInteractor: ProjectInteractor,
    private sceneInteractor: SceneInteractor,
    private metaDataInteractor: MetaDataInteractor,
    private router: Router,
    private eventBus: EventBus
  ) {}

  ngAfterViewInit() {
    const userGroups = this.getUserGroups();
    userGroups.forEach(group => this.fetchGroup(group.id));
  }

  // private hasPermission(): boolean {
  //   return this.userInteractor.isLoggedIn();
  // }

  private getUserGroups(): any[] {
    return this.userInteractor.getUserGroups();
  }

  private getProjectsByGroup(groupId: string) {
    return this.projects[groupId] || [];
  }

  private fetchGroup(groupId: string) {
    return this.groupInteractor.getGroup(groupId)
      .subscribe(
        userGroup => this.projects[groupId] = userGroup.projects,
        error => console.log('error', error)
      );
  }

  private openProject(project) {
    const userId = project.userId;
    const projectId = project.projectId;
    this.eventBus.onStartLoading();
    this.projectInteractor.openProject(userId, projectId)
      .subscribe(
        response => {
          this.sceneInteractor.setActiveRoomId(null);
          this.eventBus.onSelectRoom(null, false);
          this.eventBus.onStopLoading();
          this.metaDataInteractor.setIsReadOnly(true);
          this.router.navigateByUrl('/editor');
        },
        error => {
          this.eventBus.onStopLoading();
          this.eventBus.onModalMessage(ERROR_OPENING_PROJECT, SERVER_ERROR);
        }
      );
  }

}
