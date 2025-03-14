import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { ActionMenuProps } from '../../models/type';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;
const CRMTableActions: React.FC<ActionMenuProps> = ({
  row,
  menuState,
  handleClick,
  handleClose,
  onHandleViewModalOpen,
  onHandleEditModal,
  onHandleDeleteModal,
}) => {
  const { t } = useTranslation();

  return (
    <Box data-testid='crm-table-action'>
      <IconButton
        aria-label='more'
        id={`action-button-${row.id}`}
        aria-controls={menuState.anchorEl ? 'action-menu' : undefined}
        aria-expanded={menuState.anchorEl ? 'true' : undefined}
        aria-haspopup='true'
        onClick={(event) => handleClick(event, row.id)}
      >
        <MoreVertIcon data-testid='action-icon' />
      </IconButton>
      <Menu
        id='action-menu'
        MenuListProps={{
          'aria-labelledby': `action-button-${row.id}`,
        }}
        anchorEl={menuState.anchorEl}
        open={menuState.anchorEl !== null && menuState.rowId === row.id}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        <MenuItem
          onClick={() => onHandleViewModalOpen(row)}
          data-testid='view-modal'
        >
          {t('view')}
        </MenuItem>
        <MenuItem
          onClick={() => onHandleEditModal(row)}
          data-testid='edit-modal'
        >
          {t('edit')}
        </MenuItem>
        <MenuItem
          onClick={() => onHandleDeleteModal(row)}
          data-testid='delete-modal'
        >
          {t('delete')}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CRMTableActions;
