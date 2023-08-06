CREATE OR ALTER TRIGGER SIC_VALIDA_FOLIOS_CM FOR DOCTOS_CM
ACTIVE BEFORE INSERT OR UPDATE POSITION 0
AS
begin
  IF  (OLD.APLICADO = 'N' AND NEW.APLICADO = 'S' AND NOT NEW.proveedor_id IS NULL) THEN
  BEGIN
      if (exists(select * from doctos_cm dc where dc.folio_prov = new.folio_prov and dc.proveedor_id = new.proveedor_id and dc.docto_cm_id <> new.docto_cm_id) ) then
      begin
        exception ex_alta_prohibida 'Ya existe una compra con este folio de este proveedor';
      end
  end
end