package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AddressCheckReport.
 */
@Document(collection = "address_check_report")
public class AddressCheckReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("address_verified")
    private String addressVerified;

    @Field("id_auth_verified_by")
    private String idAuthVerifiedBy;

    @Field("address_verified_by")
    private String addressVerifiedBy;

    @Field("address_verified_date")
    private String addressVerifiedDate;

    @Field("address_remarks")
    private String addressRemarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddressVerified() {
        return addressVerified;
    }

    public AddressCheckReport addressVerified(String addressVerified) {
        this.addressVerified = addressVerified;
        return this;
    }

    public void setAddressVerified(String addressVerified) {
        this.addressVerified = addressVerified;
    }

    public String getIdAuthVerifiedBy() {
        return idAuthVerifiedBy;
    }

    public AddressCheckReport idAuthVerifiedBy(String idAuthVerifiedBy) {
        this.idAuthVerifiedBy = idAuthVerifiedBy;
        return this;
    }

    public void setIdAuthVerifiedBy(String idAuthVerifiedBy) {
        this.idAuthVerifiedBy = idAuthVerifiedBy;
    }

    public String getAddressVerifiedBy() {
        return addressVerifiedBy;
    }

    public AddressCheckReport addressVerifiedBy(String addressVerifiedBy) {
        this.addressVerifiedBy = addressVerifiedBy;
        return this;
    }

    public void setAddressVerifiedBy(String addressVerifiedBy) {
        this.addressVerifiedBy = addressVerifiedBy;
    }

    public String getAddressVerifiedDate() {
        return addressVerifiedDate;
    }

    public AddressCheckReport addressVerifiedDate(String addressVerifiedDate) {
        this.addressVerifiedDate = addressVerifiedDate;
        return this;
    }

    public void setAddressVerifiedDate(String addressVerifiedDate) {
        this.addressVerifiedDate = addressVerifiedDate;
    }

    public String getAddressRemarks() {
        return addressRemarks;
    }

    public AddressCheckReport addressRemarks(String addressRemarks) {
        this.addressRemarks = addressRemarks;
        return this;
    }

    public void setAddressRemarks(String addressRemarks) {
        this.addressRemarks = addressRemarks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AddressCheckReport addressCheckReport = (AddressCheckReport) o;
        if (addressCheckReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), addressCheckReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AddressCheckReport{" +
            "id=" + getId() +
            ", addressVerified='" + getAddressVerified() + "'" +
            ", idAuthVerifiedBy='" + getIdAuthVerifiedBy() + "'" +
            ", addressVerifiedBy='" + getAddressVerifiedBy() + "'" +
            ", addressVerifiedDate='" + getAddressVerifiedDate() + "'" +
            ", addressRemarks='" + getAddressRemarks() + "'" +
            "}";
    }
}
