export interface ITodoItem{
Task: string;
CreatedBy: string;
CreatedOn: Date;
Status: TaskStatus;
}

export enum TaskStatus{
None,
Complete,
Cancel,
Pending
}

export class TodoItem {

static TodoArray: ITodoItem[] = []
TodItem: ITodoItem;

//constructor if required
constructor(item: ITodoItem){
	this.Post(item);
};


Post(item: ITodoItem): void {
TodoItem.TodoArray.push(item)
}

Get(){
return TodoItem.TodoArray;	
};

Put(item: ITodoItem){

}

Delete(index: number){
TodoItem.TodoArray.splice(index,1);
}

}


