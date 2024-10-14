import React, { useContext } from 'react';
import { WebsocketContext } from '../context/WatchListContext';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Backdrop, CircularProgress,
  styled, tableCellClasses
} from '@mui/material';

const WatchList: React.FC = React.memo(() => {
  const { prices, loading } = useContext(WebsocketContext)!;

  const formatPrice = (price: string) => parseFloat(price).toFixed(4);
  
  const formatPercentage = (priceChangePercent:string) => Math.abs(parseFloat(priceChangePercent) * 100).toFixed(2) + '%';

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <Box sx={{ width: '75%'}} data-testid="content-watchList">
      <TableContainer component={Paper} sx={{ padding: '10px', width: 'auto', height: '90vh', borderRadius: '7px', border: '1px solid #e0e0e0'}}>
        <Backdrop
          open={loading}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
          }}
        >
          <CircularProgress color="primary" />
        </Backdrop>

        {Object.entries(prices).length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center',
              fontSize: 28,
              color: 'gray',
              fontWeight: 'bold'
            }}
          >
            <span>Não há símbolos adicionados</span>
          </Box>

) : (
          <Table stickyHeader aria-label="symbol watchList table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Symbol</StyledTableCell>
                <StyledTableCell align="right">Last Price</StyledTableCell>
                <StyledTableCell align="right">Bid Price</StyledTableCell>
                <StyledTableCell align="right">Ask Price</StyledTableCell>
                <StyledTableCell align="right">Price Change (%)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(prices).map(([symbol, { lastPrice, priceChangePercent, bestBidPrice, bestAskPrice }]) => (
                <TableRow key={symbol}>
                  <TableCell component="th" scope="row">{symbol}</TableCell>
                  <TableCell align="right">{formatPrice(lastPrice)}</TableCell>
                  <TableCell align="right">{formatPrice(bestBidPrice)}</TableCell>
                  <TableCell align="right">{formatPrice(bestAskPrice)}</TableCell>
                  <TableCell align="right">{formatPercentage(priceChangePercent)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
});

export default WatchList;
