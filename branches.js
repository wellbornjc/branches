// When you load the page it will center the viewport horizontally with the title at the top.
window.addEventListener('load', () => {
  const startingViewportXValue = 50000 - (1/2 * window.innerWidth);
  
  window.scrollTo(startingViewportXValue, 0);

  document.body.style.overflow = 'hidden';
});

let idCounter = 1;

let lineIdCounter = 1;

const addBranchButton = document.getElementById('add-branch-button');

const branchCreationAccordian = document.getElementById('branch-creation-accordian');

const branchCreator = document.getElementById('branch-creator');

let branchAccordianExpanded = 'no';

const nameEditButton = document.getElementById('name-edit-button')

// This opens and closes the input to edit the project name at the top of the page.
nameEditButton.addEventListener('click', () => {
  const projectName = document.getElementById('project-name');
  
  if (nameEditButton.innerText === '') {
    nameEditButton.innerText = 'Save';
    nameEditButton.style.width = '50px';
    nameEditButton.style.backgroundImage = 'none';

    projectName.innerHTML= `<textarea id="edit-project-name-input" class="editProjectNameInput">${projectName.innerText}</textarea>`;

  } else if (nameEditButton.innerText === 'Save') {
    nameEditButton.innerText = ''
    nameEditButton.style.width = '';
    nameEditButton.style.backgroundImage = '';

    const editProjectNameInput = document.getElementById('edit-project-name-input');
    const editProjectName = editProjectNameInput.value;

    projectName.innerHTML = editProjectName;

    document.removeEventListener('mousedown', clickOffName);

    return;
  };

  function clickOffName(event) {
    const projectNameContainer = document.getElementById('project-name-container');

    if (nameEditButton.contains(event.target)) {
      document.removeEventListener('mousedown', clickOffName);
      return;
    } else if (!projectNameContainer.contains(event.target)) {
      nameEditButton.innerText = ''
      nameEditButton.style.width = '';
      nameEditButton.style.backgroundImage = '';

      const editProjectNameInput = document.getElementById('edit-project-name-input');
      const editProjectName = (editProjectNameInput.value);

      projectName.innerHTML = editProjectName;

      document.removeEventListener('mousedown', clickOffName);
    };
  };
  document.addEventListener('mousedown', clickOffName);
});

const returnToTitleButton = document.getElementById('return-to-title');

// This will center the viewport horizontally with the title at the top (like when you loaded the page initially).
returnToTitleButton.addEventListener('click', () => {
  const startingViewportXValue = 50000 - (1/2 * window.innerWidth);
  
  window.scrollTo(startingViewportXValue, 0);
});

// This displays or hides the branch creation accordian.
branchCreationAccordian.addEventListener('click', () => {
  if (branchAccordianExpanded === 'no') {
    branchAccordianExpanded = 'yes';

    branchCreationAccordian.innerText = 'Close Branch Creator';

    branchCreator.style.display = '';
    
  } else if (branchAccordianExpanded === 'yes') {
    branchAccordianExpanded = 'no';

    branchCreationAccordian.innerText = 'Create a New Branch';

    branchCreator.style.display = 'none';
  };
});

function clickOffBranchCreator(event) {
  if (branchCreationAccordian.contains(event.target)) {
    return;
  } else if (!branchCreator.contains(event.target)) {
    branchAccordianExpanded = 'no';

    branchCreationAccordian.innerText = 'Create a New Branch';

    branchCreator.style.display = 'none';
  };
  };

document.addEventListener('mousedown', clickOffBranchCreator);

const optionsAccordian = document.getElementById('options-accordian');

const optionsContainer = document.getElementById('options-container');

let optionsAccordianExpanded = 'no';

// This displays or hides the options accordian.
optionsAccordian.addEventListener('click', () => {
  if (optionsAccordianExpanded === 'no') {
    optionsAccordianExpanded = 'yes';

    optionsAccordian.innerText = 'Close Options';

    optionsContainer.style.display = '';
    
  } else if (optionsAccordianExpanded === 'yes') {
    optionsAccordianExpanded = 'no';

    optionsAccordian.innerText = 'Options';

    optionsContainer.style.display = 'none';
  };
});

function clickOffOptions(event) {
  if (optionsAccordian.contains(event.target)) {
    return;
  } else if (!optionsContainer.contains(event.target)) {
    optionsAccordianExpanded = 'no';

    optionsAccordian.innerText = 'Options';

    optionsContainer.style.display = 'none';
  };
  };

document.addEventListener('mousedown', clickOffOptions);

// This handles the creation of a new branch element using the inputs fom the branch creation accordian.
addBranchButton.addEventListener('click', () => {
  const newBranchNameInput = document.getElementById('branch-name-input');
  const newBranchName = newBranchNameInput.value;
  const newBranchDetailsInput = document.getElementById('branch-details-input');
  const newBranchDetails = newBranchDetailsInput.value;

  const branch = document.createElement('div');
    branch.id = idCounter;
    branch.className = 'branch';
    branch.style.left = (Math.floor(Math.random() * (750 - 615)) + 615) + 'px';
    branch.style.bottom = (Math.floor(Math.random() * (130- 80)) + 80) + 'px';
    branch.innerHTML = `
    <div title="Click and Drag Here to Place Branch" id="branch-drag-tab-${branch.id}" class="branchDragTab">Click and Drag Here to Place Branch</div>
    <div id="branch-button-container-${branch.id}" class="branchButtonContainer">
      <button id="branch-edit-button-${branch.id}" class="branchEditButton">Edit</button>
      <button id="branch-delete-button-${branch.id}" class="branchDeleteButton">Delete</button>
      <button id="branch-connection-button-${branch.id}" class="branchConnectButton" title="Click and Drag to Draw a Line to Other Branches">Connect</button>
    </div>
    <div id="branch-name-${branch.id}" class="branchName">${newBranchName}</div>
    <div id="branch-details-${branch.id}" class="branchDetails">${newBranchDetails}</div>
    `;

    newBranchNameInput.value = '';
    newBranchDetailsInput.value = '';

    document.body.appendChild(branch);

    let tabStartX = 0;
    let tabStartY = 0;
    let tabNewX = 0;
    let tabNewY = 0;

    const branchDragTabID = `branch-drag-tab-${branch.id}`;
    const branchDragTab = document.getElementById(branchDragTabID);

    branchDragTab.addEventListener('mousedown', clickedTab);

    function clickedTab(e) {
      branch.style.zIndex = 10;

      tabStartX = e.pageX
      tabStartY = e.pageY

      branchDragTab.style.cursor = 'grabbing';

      document.addEventListener('mousemove', dragTab);
      document.addEventListener('mouseup', releaseTab);
    };

    // These handle the clicking, dragging, and releasing of the tab at the top of a branch setting where its new position on the screen will be.
    function dragTab(e) {
      branchDragTab.innerText = '. . .';
      branchDragTab.style.fontStyle = 'bolder';
      branch.style.position = 'absolute';

      tabNewX = tabStartX;
      tabNewY = tabStartY;

      tabStartX = e.pageX;
      tabStartY = e.pageY;

      const linesStartingHere = document.getElementsByClassName(`start-branch-connection-button-${e.target.parentNode.id}`)

      Array.from(linesStartingHere).forEach(element => {
        element.setAttribute('x1', tabNewX);
        element.setAttribute('y1', tabNewY);
      });

      const linesEndingHere = document.getElementsByClassName(`end-branch-connection-button-${e.target.parentNode.id}`)

      Array.from(linesEndingHere).forEach(element => {
        element.setAttribute('x2', tabNewX);
        element.setAttribute('y2', tabNewY);
      });

      branch.style.top = tabNewY + 'px';
      branch.style.left = tabNewX + 'px';
    };

    function releaseTab() {
      document.removeEventListener('mousemove', dragTab);
      document.removeEventListener('mouseup', releaseTab);

      branch.style.zIndex = '';

      branchDragTab.style.cursor = '';
    };

    const branchEditButtonId = `branch-edit-button-${branch.id}`
    const branchEditButton = document.getElementById(branchEditButtonId)

    // This allows for the editing of the information in a specific created branch.
    branchEditButton.addEventListener('click', () => {
      const branchNameId = `branch-name-${branch.id}`
      const branchName = document.getElementById(branchNameId);
      const branchDetailsId = `branch-details-${branch.id}`
      const branchDetails = document.getElementById(branchDetailsId);

      if (branchEditButton.innerText === 'Edit') {
        branchEditButton.innerText = 'Save'

        branchEditButton.style.width = '450px';
        branchConnectButton.style.zIndex = '-1';
        branchDeleteButton.style.zIndex = '-1';
        branch.style.zIndex = '10'

        branchName.innerHTML= `<textarea id="edit-name-input" class="editNameInput">${branchName.innerText}</textarea>`;
        branchDetails.innerHTML= `<textarea id="edit-details-input" class="editDetailsInput">${branchDetails.innerText}</textarea>`;
      } else if (branchEditButton.innerText === 'Save') {
        branchEditButton.innerText = 'Edit'
        branchEditButton.style.width = '';
        branchConnectButton.style.zIndex = '';
        branchDeleteButton.style.zIndex = '';
        branch.style.zIndex = ''

        const editNameInput = document.getElementById('edit-name-input');
        const editName = editNameInput.value;
        const editDetailsInput = document.getElementById('edit-details-input');
        const editDetails = editDetailsInput.value;

        branchName.innerHTML = editName;
        branchDetails.innerHTML = editDetails;

        document.removeEventListener('mousedown', clickOffEdit);

        return;
      };

      function clickOffEdit(event) {
        if (branchEditButton.contains(event.target)) {
          document.removeEventListener('mousedown', clickOffEdit);
          return;
        } else if (!branch.contains(event.target)) {
          branchEditButton.innerText = 'Edit'
          branchEditButton.style.width = '';
          branchConnectButton.style.zIndex = '';
          branchDeleteButton.style.zIndex = '';
          branch.style.zIndex = ''

          const editNameInput = document.getElementById('edit-name-input');
          const editName = editNameInput.value;
          const editDetailsInput = document.getElementById('edit-details-input');
          const editDetails = editDetailsInput.value;

          branchName.innerHTML = editName;
          branchDetails.innerHTML = editDetails;

          document.removeEventListener('mousedown', clickOffEdit);
        };
      };
      document.addEventListener('mousedown', clickOffEdit);
    });

    const branchConnectButtonID = `branch-connection-button-${branch.id}`;
    const branchConnectButton = document.getElementById(branchConnectButtonID);

    const branchConnectorContainer = document.getElementById('branch-connector-container');
    
    branchConnectButton.addEventListener('mousedown', clickedConnect)
    
    // These handle the clicking, dragging, and releasing of the connect button on a created branch to allow you to draw lines between branches using SVG.
    function clickedConnect(e) {
      const clickedBranchId = e.target.id;

      const newLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        newLine.id = 'line-' + lineIdCounter;
        newLine.classList.add('start-' + clickedBranchId);
        newLine.setAttribute('x1', e.pageX);
        newLine.setAttribute('y1', e.pageY);
        newLine.setAttribute('x2', e.pageX);
        newLine.setAttribute('y2', e.pageY);
        newLine.setAttribute('stroke', 'black');
        newLine.setAttribute('stroke-width', '6px');
        newLine.addEventListener('click', () => {
          newLine.remove();
        });
      branchConnectorContainer.appendChild(newLine);

      const allConnectButtons = document.getElementsByClassName('branchConnectButton');

      Array.from(allConnectButtons).forEach(element => {
        if (element !== branchConnectButton) {
          element.innerText = 'Release Here To Connect to This Branch';
          element.style.fontSize = '25px';
          element.style.width = '100%';
          element.style.height = '100%';
          element.style.borderRadius = '7px';
          element.style.marginLeft = '-225px';
          element.style.marginTop = '-26.5px';
        };
      });

      lineIdCounter++;

      document.addEventListener('mousemove', dragConnect);
        
      function dragConnect(e) {
        newLine.setAttribute('x2', e.pageX);
        newLine.setAttribute('y2', e.pageY);
      };

      document.addEventListener('mouseup', releaseConnect); 
      
      function releaseConnect(event) {
        const releasedBranchId = event.target.id;

        newLine.classList.add('end-' + releasedBranchId);
        newLine.classList.add('connectorLine');

        if (!event.target.classList.contains('branchConnectButton')) {
          newLine.remove();
        };

         Array.from(allConnectButtons).forEach(element => {
        if (element !== branchConnectButton) {
          element.innerText = 'Connect';
          element.style.fontSize = '';
          element.style.width = '';
          element.style.height = '';
          element.style.borderRadius = '';
          element.style.marginLeft = '';
          element.style.marginTop = '';
        };
      });

        document.removeEventListener('mousemove', dragConnect);
        document.removeEventListener('mouseup', releaseConnect);
      };
    };

    const branchDeleteButtonId = `branch-delete-button-${branch.id}`;
    const branchDeleteButton = document.getElementById(branchDeleteButtonId);

    // Allows for the deletion of a branch after confirming on a popup.
    branchDeleteButton.addEventListener('click', (e) => {
      document.body.style.overflow = 'hidden';

      const deleteBranchConfirmation = document.createElement('div');
        deleteBranchConfirmation.innerHTML = 
          `Deleteing this branch will also delete all lines connected to the branch. Are you sure you want to delete this branch forever? 
          <div></div>
          <button class="yesDeleteBranch" id="yes-delete-branch">Yes</button>
          <button class="noDeleteBranch" id="no-delete-branch">No</button>`
        deleteBranchConfirmation.className = 'deleteBranchConfirmation';

      document.body.appendChild(deleteBranchConfirmation);

      const yesDeleteBranch = document.getElementById('yes-delete-branch');

      yesDeleteBranch.addEventListener('click', () => {
        branch.outerHTML = '';

        const deleteButtonParent = e.target.parentNode; 

        const linesStartingHere = document.getElementsByClassName(`start-branch-connection-button-${deleteButtonParent.parentNode.id}`)

        Array.from(linesStartingHere).forEach(element => {
          element.remove();
        });

        const linesEndingHere = document.getElementsByClassName(`end-branch-connection-button-${deleteButtonParent.parentNode.id}`)

        Array.from(linesEndingHere).forEach(element => {
          element.remove();
        });

        deleteBranchConfirmation.remove();
        
        document.body.style.overflow = '';
      });
     
      const noDeleteBranch = document.getElementById('no-delete-branch');

      noDeleteBranch.addEventListener('click', () => {
        deleteBranchConfirmation.remove();

        document.body.style.overflow = '';
      });

      function clickOffDeleteBranch(event) {
      if (!deleteBranchConfirmation.contains(event.target)) {
        deleteBranchConfirmation.remove();

        document.body.style.overflow = '';
      };
      };

    document.addEventListener('mousedown', clickOffDeleteBranch);
    });
    idCounter++;
});

const deleteAllBranchesButton = document.getElementById('delete-all-branches');

// Allows for the deletion of all created branches after confirming on a popup.
deleteAllBranchesButton.addEventListener('click', () => {
  optionsAccordianExpanded = 'no';

  optionsAccordian.innerText = 'Options';

  optionsContainer.style.display = 'none';

  const deleteAllBranchesConfirmation = document.createElement('div');
  deleteAllBranchesConfirmation.innerHTML = 
    `Clicking yes bellow will delete all branches and connecting lines. Are you sure you want to delete these forever? 
    <div></div>
    <button class="yesDeleteAllBranches" id="yes-delete-all-branches">Yes</button>
    <button class="noDeleteAllBranches" id="no-delete-all-branches">No</button>`
  deleteAllBranchesConfirmation.className = 'deleteAllBranchesConfirmation';

  document.body.appendChild(deleteAllBranchesConfirmation);

  document.body.style.overflow = 'hidden';

  const yesDeleteAllBranches = document.getElementById('yes-delete-all-branches');

      yesDeleteAllBranches.addEventListener('click', () => {
        const allBranches = document.getElementsByClassName('branch');

        Array.from(allBranches).forEach(element => {
          element.outerHTML = '';

          const linesStartingHere = document.getElementsByClassName(`start-branch-connection-button-${element.id}`)

          Array.from(linesStartingHere).forEach(element => {
            element.remove();
          });

          const linesEndingHere = document.getElementsByClassName(`end-branch-connection-button-${element.id}`)

          Array.from(linesEndingHere).forEach(element => {
            element.remove();
          });
        });

        deleteAllBranchesConfirmation.remove();
        
        document.body.style.overflow = '';
      });
     
      const noDeleteAllBranches = document.getElementById('no-delete-all-branches');

      noDeleteAllBranches.addEventListener('click', () => {
        deleteAllBranchesConfirmation.remove();

        document.body.style.overflow = '';
      });

      function clickOffDeleteAllBranches(event) {
      if (!deleteAllBranchesConfirmation.contains(event.target)) {
        deleteAllBranchesConfirmation.remove();

        document.body.style.overflow = '';
      };
      };

    document.addEventListener('mousedown', clickOffDeleteAllBranches);
});

const helpInfoButton = document.getElementById('help-info-button');
const helpInfo = document.getElementById('help-info');

// Redisplays the help info that was displayed when you first loaded the page.
helpInfoButton.addEventListener('click', () => {
  optionsAccordianExpanded = 'no';

  optionsAccordian.innerText = 'Options';

  optionsContainer.style.display = 'none';

  helpInfo.style.display = '';

  document.body.style.overflow = 'hidden';
});

const closeHelpInfo = document.getElementById('close-help-info');

closeHelpInfo.addEventListener('click', () => {
  helpInfo.style.display = 'none';

  document.body.style.overflow = '';
});

function clickOffHelpInfo(event) {
  if (!helpInfo.contains(event.target)) {
    helpInfo.style.display = 'none';

    document.body.style.overflow = '';
  };
};
document.addEventListener('mousedown', clickOffHelpInfo);
