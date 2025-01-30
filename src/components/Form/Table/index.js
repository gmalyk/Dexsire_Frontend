import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ButtonContainer, EmptyMessage, Icon, Load, LoadCenter } from 'ui/styled';
import { Image, Ranking, TableContent } from './styled';
import Button from '../Button';
import useI18n from 'hooks/useI18n';
//styleName: H8 - Inter Bold - 12pt;
// font - family: Inter;
// font - size: 16px;
// font - weight: 700;
// line - height: 19.36px;
// text - align: center;


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.colors.black,
    color: theme.palette.common.white,
    border: 'none',
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: '19.36px',
    textAlign: 'left',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    backgroundColor: theme.palette.colors.black,
    color: theme.palette.common.white,
    fontFamily: 'Inter',
    fontWeight: 700,
    lineHeight: '16px',
    border: 'none',

  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 20,
  border: `1px solid ${theme.palette.borderBackground.main}`,
  padding: 24,
  backgroundColor: theme.palette.colors.black,
}));

export default function BasicTable({ columns, rows, loading, noMore }) {
  const { t } = useI18n()
  return (
    <StyledTableContainer component={Paper}>
      <Table sx={{ minWidth: 150 }} aria-label="simple table"

      >
        <TableHead
        >
          <TableRow>
            {
              columns?.map((item, key) =>
                <StyledTableCell key={key} align={key === 0 ? "left" : "right"} >

                  {item.title}
                </StyledTableCell>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {
                columns?.map((item, key) =>
                  <StyledTableCell key={key} align={key === 0 ? "left" : "center"}>
                    <TableContent>
                      {item?.ranking ? <Ranking> {String(rowIndex + 1).padStart(2, '0')} </Ranking> : null}
                      {key === 0 && row?.src ? <Image src={row?.src} /> : null}
                      {item?.icon ? <Icon icon={item?.icon} /> : null}
                      {item?.['renderCell'] ? item.renderCell({ row }) : row?.[item.ref]}
                    </TableContent>
                  </StyledTableCell>
                )
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
        !loading ? <>
          {rows?.length ? null : <EmptyMessage>Nenhum registro encontrado</EmptyMessage>}
        </> :
          <LoadCenter>
            <Load />
          </LoadCenter>
      }
      {noMore ? null : <ButtonContainer center>
        <Button
          onClick={() => console.log('Load more')}
          outlineGradient
          rightIcon={'chevron-right'}
          width={'fit-content'}
        >
          { t("admin_dashboardowner_loadmore") }
        </Button>

      </ButtonContainer>}
    </StyledTableContainer>
  );
}