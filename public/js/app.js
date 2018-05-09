class TaskDashboard extends React.Component {
	state = {
		tasks: [],
		EditTask: {
			title: "",
			content: "",
			id: null
		}
	};
	componentDidMount() {
		this.loadTasksFromServer();
		setInterval(this.loadTasksFromServer, 5000);
	}

	loadTasksFromServer = () => {
		client.getTasks(serverTasks => this.setState({ tasks: serverTasks }));
	};

	createTask = task => {
		const t = helpers.newTask(task);
		this.setState({
			tasks: this.state.tasks.concat(t)
		});
		client.createTask(t);
	};

	removeTask = taskId => {
		this.setState({
			tasks: this.state.tasks.filter(t => t.id !== taskId)
		});
		client.deleteTask({ id: taskId });
	};

	updateTask = attrs => {
		this.setState({
			tasks: this.state.tasks.map(task => {
				if (task.id === attrs.id) {
					return Object.assign({}, task, {
						title: attrs.title,
						content: attrs.content
					});
				} else {
					return task;
				}
			})
		});
		client.updateTask(attrs);
	};

	editTaskModal = attrs => {
		this.setState({
			EditTask: Object.assign({}, attrs)
		});
		this.childModalTaskForm.updateState(attrs);
	};

	resetTaskModal = () => {
		this.setState({
			EditTask: {
				title: "",
				content: "",
				id: null
			}
		});
	};

	handleSubmitForm = attrs => {
		if (attrs.id == null) {
			this.createTask(attrs);
		} else {
			this.updateTask(attrs);
		}
	};

	render() {
		if (this.state.tasks.length > 0) {
			return (
				<div>
					<EditableTaskList
						tasks={this.state.tasks}
						handleTrashClick={this.removeTask}
						handleEditClick={this.editTaskModal}
					/>
					<ModalTaskForm
						handleSubmitForm={this.handleSubmitForm}
						handleCreateClick={null}
						resetTask={this.resetTaskModal}
						ref={childModalTaskForm => {
							this.childModalTaskForm = childModalTaskForm;
						}}
					/>
				</div>
			);
		} else {
			return (
				<div>
					<FloatingActionButton noTask={1} />
					<ModalTaskForm
						handleSubmitForm={this.handleSubmitForm}
						handleCreateClick={null}
						resetTask={this.resetTaskModal}
						ref={childModalTaskForm => {
							this.childModalTaskForm = childModalTaskForm;
						}}
					/>
				</div>
			);
		}
	}
}

class EditableTaskList extends React.Component {
	render() {
		const tasks = this.props.tasks.map((task, index) => (
			<EditableTask
				key={task.id}
				id={task.id}
				title={task.title}
				content={task.content}
				handleTrashClick={this.props.handleTrashClick}
				handleEditClick={this.props.handleEditClick}
				isLast={index === this.props.tasks.length - 1 ? 1 : null}
			/>
		));
		return (
			<div id="task" className="container">
				{tasks}
			</div>
		);
	}
}
class EditableTask extends React.Component {
	onTrashClick = () => {
		this.props.handleTrashClick(this.props.id);
	};

	onEditClick = () => {
		this.props.handleEditClick({
			title: this.props.title,
			content: this.props.content,
			id: this.props.id
		});
	};

	render() {
		return (
			<div className="task d-flex flex-row-reverse p-2 bg-light">
				{this.props.isLast ? <FloatingActionButton /> : null}
				<a>
					<i
						className="icon  align-self-end fas fa-trash"
						onClick={this.onTrashClick}
					/>
				</a>
				<a>
					<i
						className="icon fas fa-edit"
						onClick={this.onEditClick}
						data-toggle="modal"
						data-target="#exampleModal"
					/>
				</a>
				<div className="container-fluid">
					<div className="container">
						<h1 className="title">{this.props.title}</h1>
						<p className="content">{this.props.content}</p>
					</div>
				</div>
			</div>
		);
	}
}
class FloatingActionButton extends React.Component {
	render() {
		var task = {
			position: "absolute",
			bottom: -35 + "px",
			right: 10 + "px"
		};
		var noTask = {
			position: "absolute",
			bottom: 100 + "px",
			right: 40 + "px"
		};
		var datatoggle = "data-toggle";
		var dataplacement = "data-placement";
		return (
			<div style={this.props.noTask ? noTask : task}>
				<span
					{...(this.props.noTask
						? {
								datatoggle: "tooltip",
								dataplacement: "left",
								title: "Create a new task"
						  }
						: {})}
				>
					<span
						className="fab"
						data-toggle="modal"
						data-target="#exampleModal"
					>
						+
					</span>
				</span>
			</div>
		);
	}
}

class ModalTaskForm extends React.Component {
	state = {
		title: "",
		content: "",
		id: null
	};

	updateState(newState) {
		this.setState(Object.assign({}, newState));
	}

	resetTask = () => {
		this.setState(
			Object.assign(
				{},
				{
					title: "",
					content: "",
					id: null
				}
			)
		);
		this.props.resetTask();
	};

	handleTitleChange = e => {
		this.setState({ title: e.target.value });
	};

	handleContentChange = e => {
		this.setState({ content: e.target.value });
	};
	submitForm = () => {
		this.resetTask();
		this.props.handleSubmitForm({
			title: this.state.title,
			content: this.state.content,
			id: this.state.id
		});
	};

	render() {
		return (
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								{this.state.id ? "Edit Task" : "New Task"}
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
								onClick={this.resetTask}
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<label htmlFor="title">Title</label>
								<input
									type="text"
									className="form-control"
									id="title"
									value={this.state.title}
									onChange={this.handleTitleChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="content">Content</label>
								<input
									type="text"
									className="form-control"
									id="content"
									value={this.state.content}
									onChange={this.handleContentChange}
								/>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
								onClick={this.resetTask}
							>
								Close
							</button>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								className="btn btn-primary"
								onClick={this.submitForm}
							>
								{this.state.id ? "Update" : "Create"}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<TaskDashboard />, document.getElementById("container"));
