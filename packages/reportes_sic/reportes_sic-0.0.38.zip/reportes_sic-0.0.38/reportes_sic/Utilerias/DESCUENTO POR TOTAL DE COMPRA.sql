CREATE OR ALTER TRIGGER SIC_DSCTO_GRAL_TOTAL FOR DOCTOS_PV
ACTIVE BEFORE UPDATE POSITION 0
AS
declare variable importe_neto double precision;
begin
    if  (NEW.tipo_docto = 'V' AND not NEW.cliente_id is NULL) THEN
    begin
        select sum(dpd.unidades * dpd.precio_unitario_impto) from doctos_pv_det dpd where dpd.docto_pv_id = new.docto_pv_id into :importe_neto;

        if (importe_neto < 300) then
        begin
            new.dscto_pctje = 0;
        end
        if (importe_neto >= 300 and importe_neto < 500) then
        begin
            new.dscto_pctje = 5;
        end
        if (importe_neto >= 500 and importe_neto < 1000) then
        begin
            new.dscto_pctje = 7;
        end
        if (importe_neto >= 1000 and importe_neto < 1500) then
        begin
            new.dscto_pctje = 10;
        end
        if (importe_neto >= 1500) then
        begin
            new.dscto_pctje = 12;
        end
    end
end