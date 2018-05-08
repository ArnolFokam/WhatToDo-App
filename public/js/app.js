class TaskDashboard extends React.Component {
	state = {
		tasks: []
	};
	componentDidMount() {
		this.loadTasksFromServer();
		setInterval(this.loadTasksFromServer, 5000);
	}

	loadTasksFromServer = () => {
		client.getTasks(serverTasks => this.setState({ tasks: serverTasks }));
	};
	render() {
		return (
			<div>
				<EditableTaskList tasks={this.state.tasks} />
				<ModalTaskForm />
			</div>
		);
	}
}

class EditableTaskList extends React.Component {
	render() {
		const tasks = this.props.tasks.map((task,index) => (
			<EditableTask
				key={task.id}
				id={task.id}
				title={task.title}
				content={task.content}
				isLast={(index === this.props.tasks.length-1) ? 1 : null}
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
	render() {
		return (
			<div className="task d-flex flex-row-reverse p-2 bg-light">
				{this.props.isLast? <FloatingActionButton /> : null}
				<a>
					<i className="icon  align-self-end fas fa-trash" />
				</a>
				<a>
					<i className="icon fas fa-edit" />
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
		return (
			<div style={{position: 'absolute',bottom: -35 + 'px',right: 10 + 'px'}} >
				<span className="fab" data-toggle="modal" data-target="#exampleModal">
					+
				</span>
			</div>
		);
	}
}

class ModalTaskForm extends React.Component{
	render() {
		return(
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
								<h5
									className="modal-title"
									id="exampleModalLabel"
								>
									New Task
								</h5>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
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
									/>
								</div>
								<div className="form-group">
									<label htmlFor="content">Content</label>
									<input
										type="text"
										className="form-control"
										id="content"
									/>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									data-dismiss="modal"
								>
									Close
								</button>
								<button
									type="button"
									className="btn btn-primary"
								>
									Create
								</button>
							</div>
						</div>
					</div>
				</div>
				);
	}
}

ReactDOM.render(<TaskDashboard />, document.getElementById("container"));
