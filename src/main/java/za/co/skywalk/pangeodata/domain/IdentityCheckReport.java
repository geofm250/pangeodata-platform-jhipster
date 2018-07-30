package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A IdentityCheckReport.
 */
@Document(collection = "identity_check_report")
public class IdentityCheckReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("id_verified")
    private String idVerified;

    @Field("id_auth_verified_by")
    private String idAuthVerifiedBy;

    @Field("id_verified_date")
    private String idVerifiedDate;

    @Field("id_remarks")
    private String idRemarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdVerified() {
        return idVerified;
    }

    public IdentityCheckReport idVerified(String idVerified) {
        this.idVerified = idVerified;
        return this;
    }

    public void setIdVerified(String idVerified) {
        this.idVerified = idVerified;
    }

    public String getIdAuthVerifiedBy() {
        return idAuthVerifiedBy;
    }

    public IdentityCheckReport idAuthVerifiedBy(String idAuthVerifiedBy) {
        this.idAuthVerifiedBy = idAuthVerifiedBy;
        return this;
    }

    public void setIdAuthVerifiedBy(String idAuthVerifiedBy) {
        this.idAuthVerifiedBy = idAuthVerifiedBy;
    }

    public String getIdVerifiedDate() {
        return idVerifiedDate;
    }

    public IdentityCheckReport idVerifiedDate(String idVerifiedDate) {
        this.idVerifiedDate = idVerifiedDate;
        return this;
    }

    public void setIdVerifiedDate(String idVerifiedDate) {
        this.idVerifiedDate = idVerifiedDate;
    }

    public String getIdRemarks() {
        return idRemarks;
    }

    public IdentityCheckReport idRemarks(String idRemarks) {
        this.idRemarks = idRemarks;
        return this;
    }

    public void setIdRemarks(String idRemarks) {
        this.idRemarks = idRemarks;
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
        IdentityCheckReport identityCheckReport = (IdentityCheckReport) o;
        if (identityCheckReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), identityCheckReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IdentityCheckReport{" +
            "id=" + getId() +
            ", idVerified='" + getIdVerified() + "'" +
            ", idAuthVerifiedBy='" + getIdAuthVerifiedBy() + "'" +
            ", idVerifiedDate='" + getIdVerifiedDate() + "'" +
            ", idRemarks='" + getIdRemarks() + "'" +
            "}";
    }
}
